import { GroupConfig } from "./ComponentMeta";
export declare class GroupMeta {
    propKeys: Set<string>;
    title: string;
    style: any;
    disabled?: boolean;
    name: string;
    constructor();
    static of(config: GroupConfig): GroupMeta;
    clone(): GroupMeta;
    mergeGroup(group: GroupMeta): GroupMeta;
}
