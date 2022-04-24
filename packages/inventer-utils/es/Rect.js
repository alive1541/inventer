"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
var Rect = /** @class */ (function () {
    function Rect(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    Rect.of = function (left, top, width, height) {
        return new Rect(left, top, width, height);
    };
    Rect.prototype.copyFrom = function (rect) {
        this.left = rect.left;
        this.top = rect.top;
        this.width = rect.width;
        this.height = rect.height;
    };
    Rect.prototype.right = function () {
        return this.left + this.width;
    };
    Rect.prototype.bottom = function () {
        return this.top + this.height;
    };
    Rect.prototype.boundX = function (x) {
        return this.left <= x && this.right() >= x;
    };
    Rect.prototype.boundY = function (y) {
        return this.top <= y && this.bottom() >= y;
    };
    Rect.prototype.bound = function (x, y) {
        return this.boundX(x) && this.boundY(y);
    };
    Rect.prototype.contains = function (rect) {
        return this.left <= rect.left
            && this.right() >= rect.right()
            && this.top <= rect.top
            && this.bottom() >= rect.bottom();
    };
    Rect.prototype.area = function () {
        return this.width * this.height;
    };
    Rect.prototype.intersect = function (rect) {
        var lmax = Math.max(rect.left, this.left);
        var rmin = Math.min(rect.right(), this.right());
        var tmax = Math.max(rect.top, this.top);
        var bmin = Math.min(rect.bottom(), this.bottom());
        if (lmax >= rmin || tmax >= bmin) {
            return null;
        }
        return new Rect(lmax, tmax, rmin - lmax, bmin - tmax);
    };
    Rect.prototype.apply = function (x, y, width, height) {
        var rect = this.clone();
        rect.left += x;
        rect.top += y;
        rect.width += width;
        rect.height += height;
        return rect;
    };
    Rect.prototype.replace = function (rect) {
        this.left = rect.left;
        this.top = rect.top;
        this.width = rect.width;
        this.height = rect.height;
    };
    Rect.prototype.clone = function () {
        return new Rect(this.left, this.top, this.width, this.height);
    };
    Rect.prototype.centerX = function () {
        return this.left + this.width / 2;
    };
    Rect.prototype.centerY = function () {
        return this.top + this.height / 2;
    };
    Rect.prototype.equals = function (left, top, width, height) {
        return this.left === left && this.top === top && this.width === width && this.height === height;
    };
    Rect.ZERO = new Rect(0, 0, 0, 0);
    return Rect;
}());
exports.Rect = Rect;
