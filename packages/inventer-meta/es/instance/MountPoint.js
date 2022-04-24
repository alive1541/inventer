"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MountPoint = void 0;
var utils_1 = require("@inventer/utils");
var MountPoint = /** @class */ (function () {
    function MountPoint(ele, node, cord) {
        this.ele = ele;
        this.cord = cord;
        this.node = node;
    }
    MountPoint.prototype.getRect = function () {
        var rect = this.ele.getBoundingClientRect();
        var parent = this.node.getParent();
        if (parent && parent.getMountPoint()) {
            var _a = __read(this.positionDiff(parent), 2), x = _a[0], y = _a[1];
            return new utils_1.Rect(Math.round(x), Math.round(y), Math.round(rect.width), Math.round(rect.height));
        }
        return new utils_1.Rect(Math.round(0), Math.round(0), Math.round(rect.width), Math.round(rect.height));
    };
    MountPoint.prototype.getAbsPosition = function () {
        var rect = this.ele.getBoundingClientRect();
        var cord = this.cord;
        if (!cord) {
            throw new Error("Page is not initialized to node ".concat(this.node.getId(), "."));
        }
        var left = Math.round(rect.left + cord.scrollX - cord.viewport.left);
        var top = Math.round(rect.top + cord.scrollY - cord.viewport.top);
        return [left, top];
    };
    MountPoint.prototype.positionDiff = function (node) {
        var rect1 = this.ele.getBoundingClientRect();
        var parentEle = node.getMountPoint().ele;
        var rect2 = parentEle.getBoundingClientRect();
        if (!rect2) {
            throw new Error("You cannot call positiondiff on unmounted node.");
        }
        var childRect = parentEle.children[0].getBoundingClientRect();
        var dx = childRect.left - rect2.left;
        var dy = childRect.top - rect2.top;
        return [rect1.left - rect2.left - dx, rect1.top - rect2.top - dy];
    };
    return MountPoint;
}());
exports.MountPoint = MountPoint;
