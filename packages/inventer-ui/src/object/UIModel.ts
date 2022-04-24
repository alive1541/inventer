import StateMachine from "./StateMachine";
import { JsonPage, Topic, ComponentMeta, Page, Node } from '@inventer/meta'
import { Logger, Rect, throttle } from '@inventer/utils'
import md5 from 'md5'
import SelectionNew from "./Selection.new";
import { ComponentsLoader } from "@inventer/loader";
import { NodeSelector } from "./NodeSelector";
import ResizerNew from "./Resizer.new";
export enum UIStates {
	Start,
	StartAdd,
	Adding,
	Added,
	Selected,
	Moving,
	Moved,
	StartResize,
	Resizing,
	Resized
}

export enum UIEvents {
	AUTO,
	EvtStartDragAdd,
	EvtAddDraging,
	EvtDrop,
	EvtMoving,
	EvtSelected,
	EvtCancelSelect,
	EvtNodeMoved,
	EvtNodeSyncMoving,
	EvtStartResize
}

export class UIModel extends StateMachine<UIStates, UIEvents, Topic> {
	// assistLine: AssistLine
	ctrlDown: boolean
	altDown: boolean
	mouseDown: boolean
	root: Node
	startSelVer: number
	selection: SelectionNew
	contentHash: string
	// propertyEditor: PropertyEditor
	page: Page
	dropCompoentMeta: ComponentMeta | null = null
	dropComponentPosition: [number, number] = [0, 0]
	dropNode?: Node | null
	// logger: Logger
	copyList: Array<Node> = []

	constructor(json: JsonPage, pageName: string) {
		super(UIStates.Start)
		this.selection = new SelectionNew()
		this.page = new Page(pageName, json, ComponentsLoader.get())
		this.root = this.page.root
		this.ctrlDown = false
		this.mouseDown = false
		this.altDown = false
		this.startSelVer = 0
		this.contentHash = md5(JSON.stringify(json))
		// @ts-ignore
		window.editor = this

		this.describe('拖拽新元素的逻辑', (register) => {
			register([UIStates.Start, UIStates.Selected], UIStates.StartAdd, UIEvents.EvtStartDragAdd, (meta: ComponentMeta) => {
				this.dropCompoentMeta = meta
			})
			register([UIStates.StartAdd, UIStates.Adding], UIStates.Adding, UIEvents.EvtAddDraging, (position) => {
				this.dropComponentPosition = position
				const receiver = NodeSelector.selectForDrop(this.root, position, null)
				this.emit(Topic.ShadowReceiverChanged, receiver)
			})
			register([UIStates.StartAdd, UIStates.Adding], UIStates.Added, UIEvents.EvtDrop, () => {
				const position = this.dropComponentPosition
				const node = this.page.createFromMetaNew(this.dropCompoentMeta!, position)
				const receiver = NodeSelector.selectForDrop(this.root, position, null)
				const rect = receiver!.getRect()
				const width = node.getBox().width.toPxNumberWithRect(rect)
				const height = node.getBox().height.toPxNumberWithRect(rect)
				receiver?.addToAbsolute(node, [
					position[0] - width / 2,
					position[1] - height / 2,
				])
				receiver?.emit(Topic.NewNodeAdded)
				this.dropCompoentMeta = null
				this.selection.replace(node)
				this.emit(Topic.SelectionChanged)
			})
			register(UIStates.Added, UIStates.Selected, UIEvents.AUTO, () => {
			})
		})
		this.describe("处理选中的逻辑", register => {
			register([UIStates.Start, UIStates.Selected], UIStates.Selected, UIEvents.EvtSelected, (node: Node) => {

				this.selection.replace(node)

				this.emit(Topic.SelectionChanged)
			})
			register(UIStates.Selected, UIStates.Start, UIEvents.EvtCancelSelect, (node: Node) => {
				// this.selection.remove(node)
				// this.emit(Topic.SelectionChanged)
			})

		})
		this.describe("处理拖拽的逻辑", (register) => {

			let lastReceiver: Node | null

			function selectForDrop(
				container: Node,
				rect: Rect,
				exclude: Node | null
			) {
				let receiver = NodeSelector.selectForDrop(
					container,
					[rect.centerX(), rect.centerY()],
					exclude
				)
				if (receiver && !receiver.absRect().contains(rect)) {
					const parent = receiver.getParent()
					if (parent.isFlex()) {
						receiver = parent
					}
				}
				return receiver
			}
			const handlerSyncMoving = throttle((node: Node, vec: [number, number]) => {
				const absRect = node.absRect()
				let receiver = selectForDrop(this.root, absRect, node)
				// 如果是flex布局，这里需要对children更换顺序


				if (receiver && receiver.isFlex()) {
					const children = receiver.getChildren()
					let gapIndex

					if (receiver.getBox().flexDirection === 'row') {
						// gapIndex = getFlexGapnew(children, node, "row")
					} else {
						// gapIndex = getFlexGapnew(children, node, "column")
					}
					receiver.emit(Topic.NodeGapIndexChanged, gapIndex)
				}
				if (receiver !== lastReceiver) {
					if (lastReceiver) {
						debugger
						lastReceiver.emit(Topic.NodeGapIndexChanged, null)
					}
					lastReceiver = receiver
				}


				// 对齐线
				// const lines = this.assistLine.calculateLines(absRect, node, receiver!)
				// this.emit(Toskedopic.AssistLinesChanged, { lines: lines, show: true })
			}, 30)

			register(UIStates.Selected, UIStates.Moving, UIEvents.EvtNodeSyncMoving, (node: Node, vec: [number, number]) => {
				console.log(1);

			})

			register(UIStates.Moving, UIStates.Moving, UIEvents.EvtNodeSyncMoving, (node: Node, vec: [number, number]) => {
				console.log(2);
				handlerSyncMoving(node, vec)
			})

			register([UIStates.Start, UIStates.Selected, UIStates.Moving], UIStates.Moved, UIEvents.EvtNodeMoved, (node: Node, vec: [number, number]) => {
				console.log(3);
				if (vec[0] * vec[1] !== 0) {
					node.setXYByVec(vec)
					console.log(vec)
					node.emit(Topic.NodeMoved)
					this.emit(Topic.NodeMoved)
					// this.emit(Topic.AssistLinesChanged, { lines: [], show: false })
				}
			})

			register(UIStates.Moved, UIStates.Selected, UIEvents.AUTO, () => {
				console.log(4);
				if (lastReceiver) {
					lastReceiver.emit(Topic.NodeGapIndexChanged, null)
					lastReceiver = null
				}
				this.selection.forEach(node => {

					const absRect = node.absRect()
					const position: [number, number] = [absRect.left, absRect.top]
					const receiver = selectForDrop(this.root, absRect, node)
					console.log('receiver', receiver?.getName())
					const nodeParent = node.getParent()
					if (receiver !== nodeParent) {
						receiver!.addToAbsolute(node, position)
						nodeParent.emit(Topic.NodeChildrenChanged)
						receiver?.emit(Topic.NodeChildrenChanged)
					}

					// 移动完成后从DOM上同步下结构
					if (receiver?.isFlex()) {
						setTimeout(() => {
							receiver.getChildren().forEach(child => {
								child.updateFromMount()
								child.emit(Topic.NodeMoved)
							})
						})
					}

					// 收起对齐线
					// this.emit(Topic.AssistLinesChanged, { lines: [], show: false })
				})


			})

		})

		this.describe("调整大小的交互逻辑", register => {

			let resizeNode: Node | null = null
			let startRect: Rect | null = null
			let resizer: ResizerNew | null = null
			let vecStart: [number, number] = [0, 0]
			register(
				[UIStates.Start, UIStates.Selected],
				UIStates.StartResize,
				UIEvents.EvtStartResize,
				(cubeType: number, clientVec: [number, number], node: Node) => {
					resizeNode = node
					resizer = new ResizerNew(cubeType)
					startRect = node.absRect()
					vecStart = clientVec
				}
			)

			register(
				[UIStates.StartResize, UIStates.Resizing],
				UIStates.Resizing,
				UIEvents.EvtMoving,
				(vecClient) => {
					const vec: [number, number] = [vecClient[0] - vecStart[0], vecClient[1] - vecStart[1]]

					if (resizeNode) {
						const nextRect = resizer!.nextRect(startRect!, vec)

						const parentRect = resizeNode.getParent().absRect()
						// console.log(nextRect.top - parentRect.top)

						resizeNode.setXYWH(
							nextRect.left - parentRect.left,
							nextRect.top - parentRect.top,
							nextRect.width,
							nextRect.height
						)

						resizeNode.emit(Topic.Resized)
					}
				}
			)

			register(
				UIStates.Resizing, UIStates.Resized, UIEvents.EvtDrop,
				() => {
					resizeNode = null
				}
			)

			register(
				UIStates.Resized, UIStates.Selected, UIEvents.AUTO,
				() => {
					this.emit(Topic.Resized)
				}
			)
		})

	}

}