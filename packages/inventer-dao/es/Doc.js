"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doc = void 0;
const sequelize_1 = require("sequelize");
const DB_1 = __importDefault(require("./DB"));
class Doc extends sequelize_1.Model {
}
exports.Doc = Doc;
Doc.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    idx: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    doc: {
        type: sequelize_1.DataTypes.JSON
    }
}, {
    sequelize: DB_1.default.getSequelize(),
    modelName: "Doc",
    tableName: 'doc'
});
