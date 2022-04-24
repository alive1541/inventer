
import { Map as ImmutableMap } from 'immutable'
import { BoxDescriptor } from './BoxDescriptor'
import { Bridge } from "./Bridge";

export type SizeMode = "fill" | "value" | "fixed" | 'auto'

export type SizeUnitInput = {
	value: number,
	unit: string,
	mode: SizeMode
}
export type CSSPosition = "absolute" | "relative"
export type CSSDisplay = "block" | "flex"
export type FlexDirection = "row" | "column" | ""

export type BaseJsonNode = {
	type?: string,
	group: string,
	style?: any,
	name: string,
	children?: Array<JsonNode>,
	id?: number,
	passProps?: any
}
export type NodeInstanceJsonStructure = BaseJsonNode & {
	box: BoxDescriptor
}
export declare type SkedoComponentProps = {
	bridge: Bridge;
};
export type SkedoEventName = "click" | "f12" | "data"
export type RenderFor = 'react' | 'vue' | 'dom'
export type RenderOptions = {
	key?: string
	childrenProps: Record<string, any>
	ele?: HTMLElement
}
export type JsonNode = BaseJsonNode & {
	box: BoxDescriptorInput
	linkedId?: number
}
export type JsonPage = {
	links: Record<number, JsonNode>
	page: JsonNode
}
export type BoxDescriptorInput = {
	movable?: boolean,
	resizable?: boolean,
	container?: boolean
	position?: CSSPosition,
	display?: CSSDisplay,
	flexDirection?: FlexDirection,
	selectable?: boolean
	left?: number | string | SizeUnitInput
	top?: number | string | SizeUnitInput
	width: number | string | SizeUnitInput
	height: number | string | SizeUnitInput
	marginLeft?: number | string | SizeUnitInput
	marginTop?: number | string | SizeUnitInput
	marginRight?: number | string | SizeUnitInput
	marginBottom?: number | string | SizeUnitInput
}

export type NodeData = ImmutableMap<string, any>