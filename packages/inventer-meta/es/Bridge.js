"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bridge = void 0;
var Topic_1 = require("./Topic");
var invariant_1 = __importDefault(require("invariant"));
var Bridge = /** @class */ (function () {
    function Bridge(node, page, mode) {
        if (mode === void 0) { mode = "editor"; }
        var _this = this;
        this.dataChangeHandlers = [];
        this.node = node;
        this.page = page;
        this.mode = mode;
        node === null || node === void 0 ? void 0 : node.on(Topic_1.Topic.MemorizedDataChanged).subscribe(function () {
            _this.dataChangeHandlers.forEach(function (h) { return h(); });
        });
    }
    Bridge.prototype.getNode = function () {
        (0, invariant_1.default)(this.node, "member node not exists on bridge, maybe this is a mocked bridge.");
        return this.node;
    };
    Bridge.prototype.getPage = function () {
        (0, invariant_1.default)(this.page, "member page not exists on bridge, maybe this is a mocked bridge.");
        return this.page;
    };
    Bridge.prototype.passProps = function () {
        return this.getNode().getPassProps().toJS();
    };
    Bridge.prototype.setPropValue = function (path, value) {
        this.getNode().setPassPropValue(path, value);
        this.getNode().emit(Topic_1.Topic.NodePropUpdated);
    };
    Bridge.prototype.getMode = function () {
        return this.mode;
    };
    Bridge.prototype.on = function (topic) {
        return this.getNode().on(topic);
    };
    Bridge.prototype.render = function (type, node, options) {
        switch (type) {
            case "react": {
                return this.renderForReact(node, options);
            }
            case "dom":
                return this.renderForReact(node, options);
        }
    };
    // public createLinkNode(node: Node) {
    // 	const linked = this.getPage()!.createLinkNode(node)
    // 	return linked
    // }
    // public createExternalNode(json: JsonNode) {
    // 	const node = this.getPage().createFromJSON(json)
    // 	return node
    // }
    Bridge.prototype.addChild = function (node) {
        this.getNode().addToRelative(node);
        return node;
    };
    Bridge.prototype.notify = function (eventType) {
        var _a;
        (_a = this.node) === null || _a === void 0 ? void 0 : _a.emit(Topic_1.Topic.ExternalEventNotify, {
            type: eventType,
            node: this.node
        });
    };
    Bridge.prototype.getMemorizedData = function () {
        var _a;
        return (_a = this.node) === null || _a === void 0 ? void 0 : _a.getMemorizedData();
    };
    Bridge.prototype.getNodeData = function () {
        var _a;
        var data = this.getMemorizedData();
        var path = (_a = this.node) === null || _a === void 0 ? void 0 : _a.getPassProps().get('dataPath');
        if (!path) {
            return data;
        }
        return data ? data[path] : null;
    };
    Bridge.prototype.cloneNode = function (node) {
        return this.page.cloneNode(node);
    };
    Bridge.prototype.sendToCodeless = function (msg) {
        var _a;
        (_a = this.page) === null || _a === void 0 ? void 0 : _a.emit(Topic_1.Topic.ContextMessage, msg);
    };
    Bridge.prototype.onDataChanged = function (handler) {
        this.dataChangeHandlers.push(handler);
    };
    return Bridge;
}());
exports.Bridge = Bridge;
