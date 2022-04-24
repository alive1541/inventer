import { Emiter, Logger } from "@inventer/utils";
import { ComponentElement } from "react";
import { BoxDescriptor } from "../BoxDescriptor";
import { ComponentMeta } from "../meta/ComponentMeta";
import { JsonNode, JsonPage, NodeData } from "../standard.types";
import { Topic } from "../Topic";
import { Node } from './Node'


declare type ComponentsLoader = {
	loadByName: (gourp: string, name: string) => ComponentMeta
}

export class Page extends Emiter<Topic> {
	root: Node
	id_base: number
	nodes: Array<Node>
	pageNode: Node
	name: string
	logger: Logger = new Logger('page')
	loader: ComponentsLoader
	links: Record<number, Node>

	constructor(name: string, json: JsonPage, loader: ComponentsLoader) {
		super()
		this.name = name
		this.id_base = 1
		this.nodes = []
		this.loader = loader
		const meta = this.loader.loadByName('container', 'root')
		const box = new BoxDescriptor({
			left: 0,
			top: 0,
			width: 3200,
			height: 3200
		}, meta)
		this.root = new Node(meta, meta.createData(this.createId(), box))
		this.linkPage(this.root)

		this.links = []
		Object.keys(json.links).forEach((id: any) => {
			this.links[id] = this.fromJson(json.links[id])
		})
		const pageNode = this.fromJson(json.page)
		pageNode.setAllowDrag(false)
		this.root.addToAbsolute(pageNode)
		this.pageNode = pageNode
	}
	private createId() {
		return this.id_base++
	}
	private linkPage(node: Node) {
		this.nodes[node.getId()] = node
	}
	public fromJson(json: JsonNode): Node {
		const meta = this.loader.loadByName(json.group, json.name)
		const box = new BoxDescriptor(json.box, meta)
		if (json.id) {
			this.id_base = Math.max(this.id_base, json.id)
		}
		const id = json.id || this.createId()
		let node: Node
		if (json.id) {
			const instanceData = meta.createDataFromJson(json)
			node = new Node(meta, instanceData as NodeData)
		} else {
			const instanceData = meta.createData(id, box)
			node = new Node(meta, instanceData as NodeData)
		}
		this.linkPage(node)

		return node
	}
	public cloneNode(node: Node, parent?: Node) {
		const meta = node.meta
		const data = node.getData()
			.set('id', this.createId())

		const newNode = new Node(meta, data)
		if (parent) {
			newNode.setParent(parent)
		}
		this.linkPage(newNode)

		const children = newNode.getChildren()
			.map(child => this.cloneNode(child, newNode))
		newNode.setChildren(children)
		return newNode

	}
	public createFromMetaNew(
		meta: ComponentMeta,
		position: [number, number]
	) {
		const box = meta.box.clone()
		const id = this.createId()
		const nodeData = meta.createData(id, box)
		const node = new Node(meta, nodeData)
		this.linkPage(node)
		return node
	}
}