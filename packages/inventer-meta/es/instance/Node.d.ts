import { Emiter, Rect } from '@inventer/utils';
import { BoxDescriptor } from '../BoxDescriptor';
import { Map as ImmutableMap } from 'immutable';
import { ComponentMeta } from '../meta/ComponentMeta';
import { NodeData, JsonNode } from '../standard.types';
import { Topic } from '../Topic';
import { CordNew } from './Cord.new';
import { MountPoint } from './MountPoint';
declare class InstanceData extends Emiter<Topic> {
    protected data: NodeData;
    constructor(data: NodeData);
    setInstanceData(key: string, value: any): void;
    updateInstanceData(key: string, updater: (value: any) => any): void;
    updateInstanceByPath(path: Array<string>, value: any): void;
    getData(): NodeData;
    getBox(): BoxDescriptor;
    getType(): any;
    getName(): any;
    getGroup(): any;
    getParent(): Node;
    getStyle(key: string): any;
    isMoving(): boolean;
    getId(): number;
    getWH(): [number, number];
    setXY: (x: number, y: number) => void;
    setXYWH: (x: number, y: number, w: number, h: number) => void;
    setWH: (w: number, h: number) => void;
}
export declare class Node extends InstanceData {
    meta: ComponentMeta;
    private logger;
    private mountPoint?;
    private receiving;
    private tmpData;
    level: number;
    constructor(meta: ComponentMeta, data: NodeData);
    getMountPoint(): MountPoint | undefined;
    mount(ele: HTMLElement, cord: CordNew): void;
    getChildren(): Array<Node>;
    getReceiving(): Node | null;
    isContainer(): boolean;
    isDraggable(): boolean;
    isResizable(): boolean;
    getRect(): Rect;
    updateFromMount(): void;
    getStyleObject(): any;
    getEditMode(): boolean;
    getPassProps(): ImmutableMap<string, any>;
    getValueByPath(path: Array<string>): unknown;
    isFlex(): boolean;
    absRect(): Rect;
    absPosition(): Array<number>;
    absContains(node: Node): boolean;
    isAncestorOf(node: Node): boolean;
    bfs(): Generator<Node>;
    bound(x: number, y: number): boolean;
    setParent(node: Node | null): void;
    setXYByVec(vec: [number, number]): void;
    getXYByVec(vec: [number, number]): [number, number];
    setMoving: (isMoving: boolean) => void;
    addToRelative(node: Node, position?: [number, number]): void;
    addToAbsolute(node: Node, position?: [number, number]): void;
    private sortChildren;
    private add;
    memory(data: any): void;
    getMemorizedData(): any;
    setChildren(children: Array<Node>): void;
    clearChildren(): void;
    remove(node: Node): void;
    destroy(): void;
    setpassProps: (passObject: any) => void;
    setPassPropValue(path: Array<string>, value: any): void;
    setAllowDrag: (allowDrag: boolean) => void;
    /**
     *
     * ///TODO: 结合历史部分重构
     * @param data
     */
    updateData: (data: NodeData) => void;
    autoResize(): void;
    setReceiving(node: Node | null): void;
    findByName(name: string): Node | Node[];
    print(): void;
    toJSON(links?: {}): JsonNode;
}
export {};
