import { Rect } from '@inventer/utils';
export declare class CordNew {
    viewport: Rect;
    stage: Rect;
    scrollX: number;
    scrollY: number;
    constructor(stage: Rect);
    worldX(clientX: number): number;
    worldY(clientY: number): number;
    updateScroll(scrollX: number, scrollY: number): void;
    setViewPort(rect: Rect): void;
}
