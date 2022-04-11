"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectVer = void 0;
const Redis_1 = require("./Redis");
const isDev = process.env.NODE_ENV === 'development';
class ProjectVer {
    constructor() {
        this.vers = {};
    }
    static getInst() {
        return ProjectVer.inst;
    }
    getVer(projetName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isDev) {
                return this.vers[projetName] || 0;
            }
            else {
                const client = yield Redis_1.Redis.getInst().getClient();
                return yield client.get('ver-' + projetName);
            }
        });
    }
    incVer(projetName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isDev) {
                this.vers[projetName] = (this.vers[projetName] || 0) + 1;
            }
            else {
                const client = yield Redis_1.Redis.getInst().getClient();
                yield client.incr('ver-' + projetName);
            }
        });
    }
    setVer(projectName, ver) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isDev) {
                this.vers[projectName] = ver;
            }
            else {
                const client = yield Redis_1.Redis.getInst().getClient();
                yield client.set('ver-' + projectName, ver + '');
            }
        });
    }
}
exports.ProjectVer = ProjectVer;
ProjectVer.inst = new ProjectVer();
