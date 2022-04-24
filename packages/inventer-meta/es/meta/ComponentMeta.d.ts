import { BoxDescriptorInput, JsonNode } from "../standard.types";
import { BoxDescriptor } from "../BoxDescriptor";
import { Map as ImmutableMap } from 'immutable';
export interface PropConfig {
    name: string;
    props?: any;
    type: string;
    disabled?: boolean;
    default?: any;
    label?: string;
    selections?: any;
    path: string;
    row?: number;
    children?: Array<PropConfig>;
    rowLabel?: string;
}
export interface ComponentMetaConfig {
    name: string;
    group: string;
    image: string;
    title: string;
    box: BoxDescriptorInput;
    description: string;
    intrinsic?: boolean;
    style?: any;
    author: string;
    defaultProps: any;
    componentType?: 'react' | 'vue';
    src: string;
    file: string;
    url?: string;
    yml: string;
    imageUrl: string;
    version: string;
}
export declare class ComponentMeta {
    name: string;
    group: string;
    image: string;
    title: string;
    box: BoxDescriptor;
    intrinsic?: boolean;
    url?: string;
    style?: any;
    defaultProps: any;
    imageUrl: string;
    constructor(config: ComponentMetaConfig);
    createDataFromJson(json: JsonNode): ImmutableMap<string, any>;
    createData(id: number, box: BoxDescriptor | null): ImmutableMap<string, string | number | boolean | never[] | BoxDescriptor | ImmutableMap<string, any> | import("immutable").Collection<unknown, unknown> | null>;
}
