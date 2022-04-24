import { Node } from './Node';
import { Rect } from '@inventer/utils';
import { CordNew } from './Cord.new';
export declare class MountPoint {
    ele: HTMLElement;
    node: Node;
    cord: CordNew;
    constructor(ele: HTMLElement, node: Node, cord: CordNew);
    getRect(): Rect;
    getAbsPosition(): Array<number>;
    positionDiff(node: Node): number[];
}
