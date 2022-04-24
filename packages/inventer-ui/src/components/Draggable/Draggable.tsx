import { mergeDeepLeft } from 'ramda'
import { DragEvents } from './draggable.types'
import { useDragNode } from './useDragNode'
import React from 'react'


type DraggableProps = {
	initialPosition: [string, string],
	children: JSX.Element,
	enabled: boolean,
	style?: any
} & DragEvents


const Draggable = (props: DraggableProps): JSX.Element => {
	const [node, handers] = useDragNode(props)
	const children = props.children
	const childrenProps = children.props

	const style: any = {
		position: 'absolute',
		top: props.initialPosition[1],
		left: props.initialPosition[0],
		...props.style
	}


	if (props.enabled) {
		style.tranform = `translate(${node.diffX}px, ${node.diffY}px)`

	}
	if (node.dragging) {
		style.position = 'absolute'
	}
	const draggableProps: any = {
		draggable: props.enabled,
		dragHandlers: handers,
		style
	}

	const finalProps = mergeDeepLeft(childrenProps, draggableProps)
	console.log('Draggable finalProps', finalProps)
	return React.cloneElement(children, finalProps)
}


export default Draggable