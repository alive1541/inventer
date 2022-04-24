import { Node } from './instance/Node';
import { Page } from './instance/Page';
import { RenderOptions, RenderFor, SkedoEventName } from './standard.types';
import { Topic } from './Topic';
declare type BridgeMode = "editor" | 'render';
export declare class Bridge {
    private node?;
    private page?;
    private mode;
    private dataChangeHandlers;
    renderForReact?: (node: Node, options: RenderOptions) => any;
    constructor(node?: Node, page?: Page, mode?: BridgeMode);
    getNode(): Node;
    private getPage;
    passProps(): any;
    setPropValue(path: Array<string>, value: any): void;
    getMode(): BridgeMode;
    on(topic: Topic | Topic[]): any;
    render(type: RenderFor, node: Node, options: RenderOptions): any;
    addChild(node: Node): Node;
    notify(eventType: SkedoEventName): void;
    getMemorizedData(): any;
    getNodeData(): any;
    cloneNode(node: Node): Node;
    sendToCodeless(msg: any): void;
    onDataChanged(handler: Function): void;
}
export {};
