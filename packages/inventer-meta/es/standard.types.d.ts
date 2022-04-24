import { Map as ImmutableMap } from 'immutable';
import { BoxDescriptor } from './BoxDescriptor';
import { Bridge } from "./Bridge";
export declare type SizeMode = "fill" | "value" | "fixed" | 'auto';
export declare type SizeUnitInput = {
    value: number;
    unit: string;
    mode: SizeMode;
};
export declare type CSSPosition = "absolute" | "relative";
export declare type CSSDisplay = "block" | "flex";
export declare type FlexDirection = "row" | "column" | "";
export declare type BaseJsonNode = {
    type?: string;
    group: string;
    style?: any;
    name: string;
    children?: Array<JsonNode>;
    id?: number;
    passProps?: any;
};
export declare type NodeInstanceJsonStructure = BaseJsonNode & {
    box: BoxDescriptor;
};
export declare type SkedoComponentProps = {
    bridge: Bridge;
};
export declare type SkedoEventName = "click" | "f12" | "data";
export declare type RenderFor = 'react' | 'vue' | 'dom';
export declare type RenderOptions = {
    key?: string;
    childrenProps: Record<string, any>;
    ele?: HTMLElement;
};
export declare type JsonNode = BaseJsonNode & {
    box: BoxDescriptorInput;
    linkedId?: number;
};
export declare type JsonPage = {
    links: Record<number, JsonNode>;
    page: JsonNode;
};
export declare type BoxDescriptorInput = {
    movable?: boolean;
    resizable?: boolean;
    container?: boolean;
    position?: CSSPosition;
    display?: CSSDisplay;
    flexDirection?: FlexDirection;
    selectable?: boolean;
    left?: number | string | SizeUnitInput;
    top?: number | string | SizeUnitInput;
    width: number | string | SizeUnitInput;
    height: number | string | SizeUnitInput;
    marginLeft?: number | string | SizeUnitInput;
    marginTop?: number | string | SizeUnitInput;
    marginRight?: number | string | SizeUnitInput;
    marginBottom?: number | string | SizeUnitInput;
};
export declare type NodeData = ImmutableMap<string, any>;
