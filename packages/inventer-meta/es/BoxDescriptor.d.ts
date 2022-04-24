import { Rect } from "@inventer/utils";
import { Node } from "./instance/Node";
import { ComponentMeta } from "./meta/ComponentMeta";
import { BoxDescriptorInput, SizeUnitInput, SizeMode, CSSPosition, CSSDisplay, FlexDirection } from "./standard.types";
declare type Unit = 'px' | '%';
export declare class SizeUnit {
    private value;
    private unit;
    private mode;
    private parent;
    private key;
    constructor(value: number, unit: Unit, mode: SizeMode, key: string);
    setMode(mode: SizeMode): void;
    getMode(): SizeMode;
    getValue(): number;
    getUnit(): Unit;
    setUnit(unit: Unit): void;
    toString(unit?: string): string;
    toJSON(): SizeUnitInput;
    setParent(parent: BoxDescriptor): void;
    set(val: number): void;
    private getMax;
    toPxNumberWithRect(rect: Rect): number;
    private getPrect;
    toPxNumber(node: Node): number;
    toNumber(): number;
    getKey(): string;
    static parse(ipt: string | number | SizeUnitInput | undefined, key: string): SizeUnit;
    clone(): SizeUnit;
    setValue(val: number): void;
}
export declare class BoxDescriptor {
    movable: boolean;
    resizable: boolean;
    selectable: boolean;
    position: CSSPosition;
    display: CSSDisplay;
    flexDirection: FlexDirection;
    container: boolean;
    node: Node;
    left: SizeUnit;
    top: SizeUnit;
    width: SizeUnit;
    height: SizeUnit;
    marginLeft: SizeUnit;
    marginTop: SizeUnit;
    marginBottom: SizeUnit;
    marginRight: SizeUnit;
    constructor(box?: BoxDescriptorInput, meta?: ComponentMeta);
    parseSizeUnit(ipt: string | number | SizeUnitInput | undefined, key: string): SizeUnit;
    toJson(): BoxDescriptorInput;
    setNode(node: Node): void;
    toRect(): Rect;
    clone(): BoxDescriptor;
    toString(): string;
}
export {};
