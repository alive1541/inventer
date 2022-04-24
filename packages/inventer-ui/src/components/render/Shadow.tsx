import { Node, Topic } from "@inventer/meta";
import { useContext, useEffect, useState } from "react";
import RenderContext from "./RenderContext";
import classes from './render.module.scss'


export default ({ meta, position }: { meta: any, position: [number, number] }) => {
	const context = useContext(RenderContext)
	const [receiver, setReciever] = useState<Node | null>(null)
	useEffect(() => {
		context.editor!.on(Topic.ShadowReceiverChanged)
			.subscribe((receiver: Node) => {
				setReciever(receiver)
			})
	}, [])
	if (!meta || !receiver) {
		return null
	}

	const rect = receiver.getRect()
	const width = meta.box.width.toPxNumberWithRect(rect)
	const height = meta.box.height.toPxNumberWithRect(rect)
	return (
		<div
			style={{
				transform: `translate(${context.cord.worldX(
					position[0] - width / 2
				)}px, ${context.cord.worldY(position[1] - height / 2)}px)`,
				width,
				height
			}}
			className={classes.shadow}>
		</div>
	)
}