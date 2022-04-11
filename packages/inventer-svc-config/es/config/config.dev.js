"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
    dbHost: "localhost",
    dbType: 'sqlite',
    dbName: "skedo",
    uname: 'root',
    passwd: '123456',
    storage: (0, path_1.resolve)(__dirname, 'skedo.db'),
    redisPort: 6379,
    redisHost: "127.0.0.1"
};
exports.default = config;
