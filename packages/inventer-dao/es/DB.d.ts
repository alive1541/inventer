import { Sequelize } from 'sequelize';
export default class DB {
    static sequelize: Sequelize;
    static getSequelize(): Sequelize;
}
