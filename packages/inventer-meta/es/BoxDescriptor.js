"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxDescriptor = exports.SizeUnit = void 0;
var utils_1 = require("@inventer/utils");
var SizeUnit = /** @class */ (function () {
    function SizeUnit(value, unit, mode, key) {
        this.value = 0;
        this.unit = 'px';
        this.key = key;
        this.value = value;
        this.unit = unit;
        this.mode = mode;
    }
    SizeUnit.prototype.setMode = function (mode) {
        this.mode = mode;
    };
    SizeUnit.prototype.getMode = function () {
        return this.mode;
    };
    SizeUnit.prototype.getValue = function () {
        return this.value;
    };
    SizeUnit.prototype.getUnit = function () {
        return this.unit;
    };
    SizeUnit.prototype.setUnit = function (unit) {
        this.unit = unit;
    };
    SizeUnit.prototype.toString = function (unit) {
        if (unit === void 0) { unit = ''; }
        if (this.mode === 'auto') {
            return '';
        }
        if (this.mode === 'fill') {
            return '100%';
        }
        if (unit) {
            return this.value + unit;
        }
        return this.value + this.unit;
    };
    SizeUnit.prototype.toJSON = function () {
        return {
            value: this.value,
            mode: this.mode,
            unit: this.unit
        };
    };
    SizeUnit.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    SizeUnit.prototype.set = function (val) {
        if (this.mode === 'fixed') {
            return;
        }
        if (this.unit === 'px') {
            this.value = val;
        }
        else if (this.unit === '%') {
            var prect = this.getPrect();
            var parentWidth = prect.width;
            var parentHeight = prect.height;
            if (['marginTop', 'marginBottom', 'top', 'height'].indexOf(this.key) !== -1) {
                this.value = 100 * val / parentHeight;
            }
            else {
                this.value = 100 * val / parentWidth;
            }
        }
    };
    SizeUnit.prototype.getMax = function (rect) {
        if ([
            "marginTop",
            "marginBottom",
            "top",
            "height",
        ].indexOf(this.key) !== -1) {
            return rect.height;
        }
        else {
            return rect.width;
        }
    };
    SizeUnit.prototype.toPxNumberWithRect = function (rect) {
        var realtiveMax = this.getMax(rect);
        if (this.mode === 'fill') {
            return realtiveMax;
        }
        if (this.unit === "px") {
            return this.value;
        }
        else if (this.unit === "%") {
            return realtiveMax * this.value / 100;
        }
        throw new Error("invalid sizeunit.");
    };
    SizeUnit.prototype.getPrect = function (node) {
        var parent = node === null || node === void 0 ? void 0 : node.getParent();
        var prect = parent ? parent.getRect() : node === null || node === void 0 ? void 0 : node.getRect();
        return prect || utils_1.Rect.ZERO;
    };
    SizeUnit.prototype.toPxNumber = function (node) {
        var prect = this.getPrect();
        return this.toPxNumberWithRect(prect || utils_1.Rect.ZERO);
    };
    SizeUnit.prototype.toNumber = function () {
        var _a;
        return this.toPxNumber((_a = this.parent) === null || _a === void 0 ? void 0 : _a.node);
    };
    SizeUnit.prototype.getKey = function () {
        return this.key;
    };
    SizeUnit.parse = function (ipt, key) {
        if (typeof ipt === 'object') {
            return new SizeUnit(ipt.value, ipt.unit, ipt.mode, key);
        }
        if (ipt === 'fill') {
            return new SizeUnit(100, '%', 'fill', key);
        }
        if (ipt === 'auto') {
            return new SizeUnit(100, '%', 'auto', key);
        }
        if (typeof ipt === 'undefined' || ipt === '') {
            return new SizeUnit(0, 'px', 'value', key);
        }
        if (typeof ipt === 'number') {
            return new SizeUnit(ipt, 'px', 'value', key);
        }
        if (typeof ipt === 'string') {
            if (ipt.match(/^\d+(px|%)$/)) {
                var num = Number.parseFloat(ipt.replace(/(px | %)/, ""));
                var m = ipt.match(/(px|%)/);
                var unit = m ? m[0] : "px";
                if (isNaN(num)) {
                    num = 0;
                }
                return new SizeUnit(num, unit, 'value', key);
            }
            var val = Number.parseFloat(ipt);
            if (!isNaN(val)) {
                return new SizeUnit(val, 'px', 'value', key);
            }
        }
        throw new Error("Unrecognizable size input:" + ipt);
    };
    SizeUnit.prototype.clone = function () {
        var unit = new SizeUnit(this.value, this.unit, this.mode, this.key);
        unit.parent = this.parent;
        return unit;
    };
    SizeUnit.prototype.setValue = function (val) {
        this.value = val;
    };
    return SizeUnit;
}());
exports.SizeUnit = SizeUnit;
function definedOr(val, defaultValue) {
    if (typeof val === 'undefined') {
        return defaultValue;
    }
    return val;
}
var BoxDescriptor = /** @class */ (function () {
    function BoxDescriptor(box, meta) {
        if (!box) {
            box = {
                left: '',
                top: '',
                width: '',
                height: ''
            };
        }
        this.movable = definedOr(box.movable, (meta === null || meta === void 0 ? void 0 : meta.box.movable) !== false);
        this.resizable = definedOr(box.resizable, (meta === null || meta === void 0 ? void 0 : meta.box.resizable) !== false);
        this.selectable = definedOr(box.selectable, (meta === null || meta === void 0 ? void 0 : meta.box.selectable) !== false);
        this.container = definedOr(box.container, (meta === null || meta === void 0 ? void 0 : meta.box.container) === true);
        this.position = definedOr(box.position, (meta === null || meta === void 0 ? void 0 : meta.box.position) || 'absolute');
        this.display = definedOr(box.display, (meta === null || meta === void 0 ? void 0 : meta.box.display) || 'block');
        this.flexDirection = definedOr(box.flexDirection, (meta === null || meta === void 0 ? void 0 : meta.box.flexDirection) || '');
        this.left = this.parseSizeUnit(box.left, "left");
        this.top = this.parseSizeUnit(box.top, "top");
        this.width = this.parseSizeUnit(box.width, "width");
        this.height = this.parseSizeUnit(box.height, "height");
        this.marginLeft = this.parseSizeUnit(box.marginLeft, "marginLeft");
        this.marginRight = this.parseSizeUnit(box.marginRight, "marginRight");
        this.marginBottom = this.parseSizeUnit(box.marginBottom, "marginBottom");
        this.marginTop = this.parseSizeUnit(box.marginTop, "marginTop");
    }
    BoxDescriptor.prototype.parseSizeUnit = function (ipt, key) {
        var unit = SizeUnit.parse(ipt, key);
        unit.setParent(this);
        return unit;
    };
    BoxDescriptor.prototype.toJson = function () {
        return {
            left: this.left.toJSON(),
            top: this.top.toJSON(),
            width: this.width.toJSON(),
            height: this.height.toJSON(),
            marginLeft: this.marginLeft.toJSON(),
            marginTop: this.marginTop.toJSON(),
            marginBottom: this.marginBottom.toJSON(),
            marginRight: this.marginRight.toJSON(),
            resizable: this.resizable,
            position: this.position,
            flexDirection: this.flexDirection,
            movable: this.movable,
            container: this.container,
            display: this.display,
            selectable: this.selectable
        };
    };
    BoxDescriptor.prototype.setNode = function (node) {
        this.node = node;
    };
    BoxDescriptor.prototype.toRect = function () {
        return new utils_1.Rect(this.left.getValue(), this.top.getValue(), this.width.getValue(), this.height.getValue());
    };
    BoxDescriptor.prototype.clone = function () {
        var box = new BoxDescriptor();
        box.left = this.left.clone();
        box.top = this.top.clone();
        box.width = this.width.clone();
        box.height = this.height.clone();
        box.marginBottom = this.marginBottom.clone();
        box.marginLeft = this.marginLeft.clone();
        box.marginRight = this.marginRight.clone();
        box.marginTop = this.marginTop.clone();
        box.movable = this.movable;
        box.container = this.container;
        box.selectable = this.selectable;
        box.resizable = this.resizable;
        box.position = this.position;
        box.flexDirection = this.flexDirection;
        box.display = this.display;
        return box;
    };
    BoxDescriptor.prototype.toString = function () {
        return [
            this.left.toString(),
            this.top.toString(),
            this.width.toString(),
            this.height.toString(),
        ].join(",");
    };
    return BoxDescriptor;
}());
exports.BoxDescriptor = BoxDescriptor;
