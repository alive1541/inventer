"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const svc_config_1 = __importDefault(require("@inventer/svc-config"));
class DB {
    static getSequelize() {
        if (!DB.sequelize) {
            DB.sequelize = new sequelize_1.Sequelize(svc_config_1.default.dbName, svc_config_1.default.uname, svc_config_1.default.passwd, {
                host: svc_config_1.default.dbHost,
                storage: svc_config_1.default.storage,
                dialect: svc_config_1.default.dbType
            });
        }
        return DB.sequelize;
    }
}
exports.default = DB;
