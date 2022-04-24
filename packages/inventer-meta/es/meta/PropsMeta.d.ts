import { Map as ImmutableMap } from 'immutable';
import { PropConfig } from './ComponentMeta';
export declare class PropsMeta {
    disabled?: boolean;
    path: Array<string>;
    config: PropConfig;
    constructor(config: PropConfig);
    static setPropValue(path: Array<string>, data: ImmutableMap<string, any>, value: any): ImmutableMap<string, any>;
    static getPropValue(path: Array<string>, data: ImmutableMap<string, any>): any;
}
