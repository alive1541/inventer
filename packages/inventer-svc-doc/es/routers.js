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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
function routers(app) {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    function ssi(serviceCall, res, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield serviceCall(...args);
                res.send({
                    success: true,
                    data: result
                });
            }
            catch (e) {
                console.error(chalk_1.default.red(e));
                console.error(chalk_1.default.red(e.stack));
                res.status(500).send({
                    success: false,
                    httpCode: 500,
                    message: e.toString()
                });
            }
        });
    }
}
exports.default = routers;
