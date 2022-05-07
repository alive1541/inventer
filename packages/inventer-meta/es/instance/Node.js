"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var utils_1 = require("@inventer/utils");
var immutable_1 = require("immutable");
var PropsMeta_1 = require("../meta/PropsMeta");
var Topic_1 = require("../Topic");
var MountPoint_1 = require("./MountPoint");
var InstanceData = /** @class */ (function (_super) {
    __extends(InstanceData, _super);
    function InstanceData(data) {
        var _this = _super.call(this) || this;
        _this.setXY = function (x, y) {
            _this.getBox().left.set(x);
            _this.getBox().top.set(y);
        };
        _this.setXYWH = function (x, y, w, h) {
            var box = _this.getBox();
            box.left.set(x);
            box.top.set(y);
            box.width.set(w);
            box.height.set(h);
        };
        _this.setWH = function (w, h) {
            var box = _this.getBox();
            box.width.set(w);
            box.height.set(h);
        };
        _this.data = data;
        return _this;
    }
    InstanceData.prototype.setInstanceData = function (key, value) {
        this.data = this.data.set(key, value);
    };
    InstanceData.prototype.updateInstanceData = function (key, updater) {
        this.data = this.data.updateIn([key], updater);
    };
    InstanceData.prototype.updateInstanceByPath = function (path, value) {
        this.data = PropsMeta_1.PropsMeta.setPropValue(path, this.data, value);
        this.emit(Topic_1.Topic.NodePropUpdated);
    };
    InstanceData.prototype.getData = function () {
        return this.data;
    };
    InstanceData.prototype.getBox = function () {
        return this.data.get('box');
    };
    InstanceData.prototype.getType = function () {
        return this.data.get('type');
    };
    InstanceData.prototype.getName = function () {
        return this.data.get('name');
    };
    InstanceData.prototype.getGroup = function () {
        return this.data.get('group');
    };
    InstanceData.prototype.getParent = function () {
        return this.data.get("parent");
    };
    InstanceData.prototype.getStyle = function (key) {
        return this.data.getIn(["style", key]);
    };
    InstanceData.prototype.isMoving = function () {
        return this.data.get("isMoving");
    };
    InstanceData.prototype.getId = function () {
        return this.data.get("id");
    };
    InstanceData.prototype.getWH = function () {
        var box = this.getBox();
        return [box.width.toNumber(), box.height.toNumber()];
    };
    return InstanceData;
}(utils_1.Emiter));
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    function Node(meta, data) {
        var _this = _super.call(this, data) || this;
        _this.level = 0;
        _this.setMoving = function (isMoving) {
            _this.setInstanceData('isMoving', isMoving);
        };
        _this.add = function (node) {
            if (node === _this) {
                throw new Error("cannot add node to itself.");
            }
            if (node.getParent() === _this) {
                return;
            }
            _this.logger.debug("add", node.getName(), "to", _this.getName());
            if (node.getParent()) {
                var p = node.getParent();
                p.remove(node);
            }
            node.setParent(_this);
        };
        _this.setpassProps = function (passObject) {
            _this.setInstanceData("passProps", (0, immutable_1.fromJS)(passObject));
        };
        _this.setAllowDrag = function (allowDrag) {
            _this.setInstanceData("allowDrag", allowDrag);
        };
        /**
         *
         * ///TODO: 结合历史部分重构
         * @param data
         */
        _this.updateData = function (data) {
            _this.data = data;
            _this.emit(Topic_1.Topic.NodePropUpdated);
        };
        _this.getBox().setNode(_this);
        _this.logger = new utils_1.Logger('node');
        _this.meta = meta;
        _this.receiving = null;
        return _this;
    }
    Node.prototype.getMountPoint = function () {
        return this.mountPoint;
    };
    Node.prototype.mount = function (ele, cord) {
        this.mountPoint = new MountPoint_1.MountPoint(ele, this, cord);
    };
    // #endregion
    // #region 访问器
    Node.prototype.getChildren = function () {
        var children = this.data.get("children").concat();
        var box = this.getBox();
        if (box.display === 'flex' && box.flexDirection === 'row') {
            children.sort(function (a, b) { return a.absRect().left - b.absRect().left; });
        }
        if (box.display === 'flex' && box.flexDirection === 'column') {
            children.sort(function (a, b) { return a.absRect().top - b.absRect().top; });
        }
        return children;
    };
    Node.prototype.getReceiving = function () {
        return this.receiving;
    };
    Node.prototype.isContainer = function () {
        return this.getBox().container;
    };
    Node.prototype.isDraggable = function () {
        var name = this.getName();
        return this.getBox().movable && name !== 'root' && name !== 'page';
    };
    Node.prototype.isResizable = function () {
        var name = this.getName();
        return this.getBox().resizable && name !== 'root' && name !== 'page';
    };
    Node.prototype.getRect = function () {
        var _a;
        if (!this.mountPoint) {
            return utils_1.Rect.ZERO;
            // return this.getBox().toRect()
        }
        return (_a = this.mountPoint) === null || _a === void 0 ? void 0 : _a.getRect();
    };
    Node.prototype.updateFromMount = function () {
        var rect = this.getRect();
        var box = this.getBox();
        box.left.set(rect.left);
        box.top.set(rect.top);
    };
    Node.prototype.getStyleObject = function () {
        return this.data.get("style").toJS();
    };
    Node.prototype.getEditMode = function () {
        return this.data.get("editMode");
    };
    Node.prototype.getPassProps = function () {
        return this.data.get("passProps");
    };
    Node.prototype.getValueByPath = function (path) {
        return this.data.getIn(path);
    };
    Node.prototype.isFlex = function () {
        return this.getBox().display === 'flex';
    };
    // #endregion
    //#region 计算
    Node.prototype.absRect = function () {
        var rect = this.getRect();
        var _a = __read(this.absPosition(), 2), x = _a[0], y = _a[1];
        return new utils_1.Rect(x, y, rect.width, rect.height);
    };
    Node.prototype.absPosition = function () {
        if (this.mountPoint) {
            return this.mountPoint.getAbsPosition();
        }
        var parent = this.getParent();
        var rect = this.getRect();
        if (!parent) {
            return [rect.left, rect.top];
        }
        var _a = __read(parent.absPosition(), 2), x = _a[0], y = _a[1];
        return [x + rect.left, y + rect.top];
    };
    Node.prototype.absContains = function (node) {
        var _a = __read(this.absPosition(), 2), x = _a[0], y = _a[1];
        var _b = __read(node.absPosition(), 2), x1 = _b[0], y1 = _b[1];
        var intersect = utils_1.Rect.of(x, y, this.getRect().width, this.getRect().height).intersect(utils_1.Rect.of(x1, y1, node.getRect().width, node.getRect().height));
        if (intersect === null) {
            return false;
        }
        return intersect.area() / node.getRect().area() >= 0.8;
    };
    Node.prototype.isAncestorOf = function (node) {
        while (node.getParent() && node.getParent() !== this) {
            node = node.getParent();
        }
        return node.getParent() === this;
    };
    Node.prototype.bfs = function () {
        var queue, limit, node, _a, _b, child;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    queue = [this];
                    limit = 1000;
                    _d.label = 1;
                case 1:
                    if (!(queue.length > 0 && limit-- > 0)) return [3 /*break*/, 3];
                    node = queue.shift();
                    if (!node) {
                        return [3 /*break*/, 1];
                    }
                    return [4 /*yield*/, node];
                case 2:
                    _d.sent();
                    try {
                        for (_a = (e_1 = void 0, __values(node.getChildren())), _b = _a.next(); !_b.done; _b = _a.next()) {
                            child = _b.value;
                            queue.push(child);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [3 /*break*/, 1];
                case 3:
                    if (limit === -1) {
                        throw new Error("limit exceeded.");
                    }
                    return [2 /*return*/];
            }
        });
    };
    Node.prototype.bound = function (x, y) {
        if (!this.getParent()) {
            return true;
        }
        return this.getRect().bound(x, y);
    };
    Node.prototype.setParent = function (node) {
        this.logger.debug("set-parent", this.getType(), node === null || node === void 0 ? void 0 : node.getType());
        if (node !== null)
            this.level = node.level + 1;
        this.setInstanceData('parent', node);
    };
    Node.prototype.setXYByVec = function (vec) {
        var parent = this.getParent();
        var rect = parent.getRect();
        var box = this.getBox();
        var x = box.left.toNumber();
        var y = box.top.toNumber();
        return this.setXY(x + vec[0], y + vec[1]);
    };
    Node.prototype.getXYByVec = function (vec) {
        var parent = this.getParent();
        var rect = parent.getRect();
        var box = this.getBox();
        var x = box.left.toNumber();
        var y = box.top.toNumber();
        return [x + vec[0], y + vec[1]];
    };
    Node.prototype.addToRelative = function (node, position) {
        if (!position) {
            position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()];
        }
        this.add(node);
        node.setXY.apply(node, __spreadArray([], __read(position), false));
        this.sortChildren(node);
    };
    Node.prototype.addToAbsolute = function (node, position) {
        if (!position) {
            position = [node.getBox().left.toNumber(), node.getBox().top.toNumber()];
        }
        this.add(node);
        var _a = __read(position, 2), x = _a[0], y = _a[1];
        var _b = __read(this.absPosition(), 2), sx = _b[0], sy = _b[1];
        node.setXY(x - sx, y - sy);
        this.sortChildren(node);
    };
    Node.prototype.sortChildren = function (node) {
        var _this = this;
        this.updateInstanceData("children", function (_children) {
            var children = _children;
            children = children.concat(node);
            if (_this.isFlex()) {
                children = children.sort(function (a, b) {
                    return a.getRect().left - b.getRect().left;
                });
            }
            return children;
        });
    };
    Node.prototype.memory = function (data) {
        this.tmpData = data;
        this.emit(Topic_1.Topic.MemorizedDataChanged);
    };
    Node.prototype.getMemorizedData = function () {
        if (typeof this.tmpData !== 'undefined') {
            return this.tmpData;
        }
        if (this.getParent()) {
            return this.getParent().getMemorizedData();
        }
        return null;
    };
    Node.prototype.setChildren = function (children) {
        this.setInstanceData('children', children);
    };
    Node.prototype.clearChildren = function () {
        this.setInstanceData('children', []);
    };
    Node.prototype.remove = function (node) {
        this.updateInstanceData("children", function (children) {
            return children.filter(function (x) { return x !== node; });
        });
    };
    Node.prototype.destroy = function () {
        if (this.getName() === 'root' || this.getName() === 'page') {
            return;
        }
        var parent = this.getParent();
        parent.remove(this);
    };
    Node.prototype.setPassPropValue = function (path, value) {
        var passProps = this.getPassProps()
            .setIn(path, value);
        this.setInstanceData("passProps", passProps);
    };
    Node.prototype.autoResize = function () {
        var rect = this.getRect();
        this.setWH(rect.width, rect.height);
    };
    Node.prototype.setReceiving = function (node) {
        this.logger.debug('set-receiving', node === null || node === void 0 ? void 0 : node.getType());
        if (this.receiving !== node) {
            this.receiving = node;
            this.emit(Topic_1.Topic.NodePropUpdated);
        }
    };
    //#endregion
    // public getRemoteCache(key: string) {
    // 	return this.remoteCache?.get(key)
    // }
    // public setRemoteCache(key: string, value: any) {
    // 	if (!this.remoteCache) {
    // 		this.remoteCache = new Map()
    // 	}
    // 	this.remoteCache.set(key, value)
    // }
    // //#endregion
    Node.prototype.findByName = function (name) {
        var result = __spreadArray([], __read(this.bfs()), false).filter(function (x) { return x.getName() === name; });
        if (result.length === 1) {
            return result[0];
        }
        return result;
    };
    Node.prototype.print = function () {
        var e_2, _a;
        var padding = "".padStart(this.level * 2, "  ");
        console.log(padding + this.getType());
        try {
            for (var _b = __values(this.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                node.print();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Node.prototype.toJSON = function (links) {
        if (links === void 0) { links = {}; }
        var data = this.getData().remove('parent');
        var json = data.toJS();
        var newJson = __assign(__assign({}, json), { box: json.box.toJson() });
        newJson.children = this.getChildren().map(function (child) { return child.toJSON(links); });
        return newJson;
    };
    return Node;
}(InstanceData));
exports.Node = Node;
