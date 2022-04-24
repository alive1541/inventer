import { Emiter, Logger } from "@inventer/utils";
import { ComponentMeta } from "../meta/ComponentMeta";
import { JsonNode, JsonPage } from "../standard.types";
import { Topic } from "../Topic";
import { Node } from './Node';
declare type ComponentsLoader = {
    loadByName: (gourp: string, name: string) => ComponentMeta;
};
export declare class Page extends Emiter<Topic> {
    root: Node;
    id_base: number;
    nodes: Array<Node>;
    pageNode: Node;
    name: string;
    logger: Logger;
    loader: ComponentsLoader;
    links: Record<number, Node>;
    constructor(name: string, json: JsonPage, loader: ComponentsLoader);
    private createId;
    private linkPage;
    fromJson(json: JsonNode): Node;
    cloneNode(node: Node, parent?: Node): Node;
    createFromMetaNew(meta: ComponentMeta, position: [number, number]): Node;
}
export {};
