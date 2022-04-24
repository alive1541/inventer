"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordNew = void 0;
var utils_1 = require("@inventer/utils");
var CordNew = /** @class */ (function () {
    function CordNew(stage) {
        this.scrollX = 0;
        this.scrollY = 0;
        this.viewport = utils_1.Rect.ZERO;
        this.stage = stage;
    }
    CordNew.prototype.worldX = function (clientX) {
        return Math.round(clientX + this.scrollX - this.viewport.left);
    };
    CordNew.prototype.worldY = function (clientY) {
        return Math.round(clientY + this.scrollY - this.viewport.top);
    };
    CordNew.prototype.updateScroll = function (scrollX, scrollY) {
        this.scrollX = Math.round(scrollX);
        this.scrollY = Math.round(scrollY);
    };
    CordNew.prototype.setViewPort = function (rect) {
        this.viewport = rect;
    };
    return CordNew;
}());
exports.CordNew = CordNew;
