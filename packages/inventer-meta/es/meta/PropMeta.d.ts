import { PropConfig } from './ComponentMeta';
import { Map as ImmutableMap } from 'immutable';
export declare class PropMeta {
    disabled?: boolean;
    path: Array<string>;
    config: PropConfig;
    constructor(config: PropConfig);
    static setPropValue(path: Array<string>, data: ImmutableMap<string, any>, value: any): ImmutableMap<string, any>;
    static getPropValue(path: Array<string>, data: ImmutableMap<string, any>): any;
}
