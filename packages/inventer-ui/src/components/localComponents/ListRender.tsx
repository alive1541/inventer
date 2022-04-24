import { SkedoComponentProps, Node } from '@inventer/meta'
import { useContext } from 'react'
import RenderContext from '../render/RenderContext'
import classes from './component.module.scss'

export default ({ bridge, children, childrenProps, gapIndex }: SkedoComponentProps & {
	childrenProps?: any,
	children?: Array<Node | string>,
	gapIndex?: number
}) => {
	const ctx = useContext(RenderContext)
	if (!children) {
		children = bridge.getNode().getChildren()
	}

	return (
		<>
			{
				children.map((childNode, i) => {
					if (typeof childNode === 'string') {
						const node = ctx.editor?.selection.first()
						if (childNode === '__ROW__') {
							return (
								<div className={classes.rowgap}
									key={'gap' + i}
									style={{
										width: node ? node.getRect().width : ''
									}}></div>
							)
						} else if (childNode === '__COL__') {
							<div
								className={classes.colgap}
								key={"gap" + i}
								style={{
									height: node ? node.getRect().height : ''
								}}
							></div>
						} else {
							throw new Error("Unsupported gap type " + childNode)
						}
					} else {
						return bridge.render(
							'react',
							childNode,
							{
								key: childNode.getId() + '',
								childrenProps
							}
						)
					}
				})
			}
		</>
	)
}