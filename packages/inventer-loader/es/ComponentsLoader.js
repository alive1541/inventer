"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ComponentsLoader = void 0;
const utils_1 = require("@inventer/utils");
const meta_1 = require("@inventer/meta");
const R = __importStar(require("ramda"));
const jsonschema_1 = require("jsonschema");
function loadDefault() {
    const def = require('../yml/default.yml');
    return def;
}
const metas = {};
const ymls = {};
// @ts-ignore
require.context('../yml', true, /\.yml$/)
    .keys()
    .forEach((key) => {
    key = key.replace('./', '');
    const [a,] = key.split('.');
    const n = a.split('/').pop();
    if (n && n !== 'default') {
        const config = require(`../yml/${key}`);
        ymls[config.group + '.' + config.name] = config;
    }
});
class ComponentsLoader extends utils_1.Emiter {
    constructor() {
        super(...arguments);
        this.state = 0;
        this.list = [];
    }
    loadByName(group, name) {
        const key = group + '.' + name;
        if (!metas[key]) {
            const props = R.clone(ComponentsLoader.defaultProps);
            if (!ymls[key]) {
                throw new Error(key + 'not fount');
            }
            const customProps = ymls[key];
            const merged = mergeLeft(props, customProps);
            validateConfig(key, merged);
            const meta = new meta_1.ComponentMeta(merged);
            metas[key] = meta;
        }
        return metas[key];
    }
    static get() {
        // @ts-ignore
        window.componentsLoader = ComponentsLoader.inst;
        return ComponentsLoader.inst;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state === 1) {
                this.emit(meta_1.Topic.RemoteComponentsLoaded);
                return;
            }
            for (let key in ymls) {
                const [group, name] = key.split('.');
                this.loadByName(group, name);
            }
            this.list = Object.values(metas).filter(meta => meta.intrinsic !== true);
            this.emit(meta_1.Topic.RemoteComponentsLoaded);
        });
    }
}
exports.ComponentsLoader = ComponentsLoader;
ComponentsLoader.inst = new ComponentsLoader();
ComponentsLoader.defaultProps = loadDefault();
function mergeLeft(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        const list = [...a];
        for (let i = 0; i < b.length; i++) {
            let match = false;
            for (let j = 0; j < a.length; j++) {
                if (b[i].name === a[j].name) {
                    match = true;
                    a[j] = mergeLeft(a[j], b[i]);
                    // list.push(mergeLeft(a[i], b[j]))
                    break;
                }
            }
            if (!match) {
                list.push(b[i]);
            }
        }
        return list;
    }
    else if (typeof (a) === 'object' && typeof (b) === 'object') {
        for (let key in b) {
            const val = b[key];
            if (!a[key]) {
                a[key] = b[key];
                continue;
            }
            if (typeof (val) === 'object' || Array.isArray(val)) {
                a[key] = mergeLeft(a[key], val);
            }
            else {
                a[key] = b[key];
            }
        }
    }
    return a;
}
function validateConfig(file, config) {
    const v = new jsonschema_1.Validator();
    const result = v.validate(config, meta_1.metaSchema);
    if (result.errors.length > 0) {
        const error = result.errors[0];
        throw new Error(`validate error in ${file}:` + error.stack);
    }
}
