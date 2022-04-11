"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const src_1 = __importDefault(require("../../inventer-svc-config/src"));
class DB {
    static getSequelize() {
        if (!DB.sequelize) {
            DB.sequelize = new sequelize_1.Sequelize(src_1.default.dbName, src_1.default.uname, src_1.default.passwd, {
                host: src_1.default.dbHost,
                storage: src_1.default.storage,
                dialect: src_1.default.dbType
            });
        }
        return DB.sequelize;
    }
}
exports.default = DB;
