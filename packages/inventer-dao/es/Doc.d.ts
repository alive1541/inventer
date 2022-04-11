import { Model, Optional } from 'sequelize';
interface DocAttributes {
    id: number;
    type: string;
    idx: string;
    doc: string;
}
interface DocCreationAttributes extends Optional<DocAttributes, 'id'> {
}
export declare class Doc extends Model<DocAttributes, DocCreationAttributes> {
    id: number;
}
export {};
