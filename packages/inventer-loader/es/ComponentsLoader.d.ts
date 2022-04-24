import { Emiter } from '@inventer/utils';
import { ComponentMeta, Topic, ComponentMetaConfig } from '@inventer/meta';
export declare class ComponentsLoader extends Emiter<Topic> {
    private static inst;
    static defaultProps: ComponentMetaConfig;
    state: number;
    list: Array<ComponentMeta>;
    loadByName(group: string, name: string): ComponentMeta;
    static get(): ComponentsLoader;
    load(): Promise<void>;
}
