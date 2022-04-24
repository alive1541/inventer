export declare class Rect {
    left: number;
    top: number;
    width: number;
    height: number;
    constructor(left: number, top: number, width: number, height: number);
    static of(left: number, top: number, width: number, height: number): Rect;
    copyFrom(rect: Rect): void;
    right(): number;
    bottom(): number;
    boundX(x: number): boolean;
    boundY(y: number): boolean;
    bound(x: number, y: number): boolean;
    contains(rect: Rect): boolean;
    area(): number;
    intersect(rect: Rect): Rect | null;
    apply(x: number, y: number, width: number, height: number): Rect;
    replace(rect: Rect): void;
    clone(): Rect;
    centerX(): number;
    centerY(): number;
    equals(left: number, top: number, width: number, height: number): boolean;
    static ZERO: Rect;
}
