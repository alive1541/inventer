
import { Map as ImmutableMap } from 'immutable'

export type SizeMode = "fill" | "value" | "fixed" | 'auto'

export type SizeUnitInput = {
	value: number,
	unit: string,
	mode: SizeMode
}
export type CSSPosition = "absolute" | "relative"
export type CSSDisplay = "block" | "flex"
export type FlexDirection = "row" | "column" | ""

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