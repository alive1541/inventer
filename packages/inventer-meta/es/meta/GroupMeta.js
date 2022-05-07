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
exports.GroupMeta = void 0;
var GroupMeta = /** @class */ (function () {
    function GroupMeta() {
        this.propKeys = new Set();
        this.name = '';
        this.title = '';
        this.style = {};
    }
    GroupMeta.of = function (config) {
        var group = new GroupMeta();
        group.name = config.name;
        group.title = config.title;
        group.disabled = config.disabled;
        group.style = config.style;
        if (config.props) {
            config.props.forEach(function (prop) {
                if (prop.name) {
                    group.propKeys.add(prop.name);
                }
            });
        }
        return group;
    };
    GroupMeta.prototype.clone = function () {
        var g = new GroupMeta();
        g.name = this.name;
        g.title = this.title;
        g.style = this.style;
        g.disabled = this.disabled;
        g.propKeys = new Set(__spreadArray([], __read(this.propKeys), false));
        return g;
    };
    GroupMeta.prototype.mergeGroup = function (group) {
        var g = new GroupMeta();
        g.propKeys = new Set(__spreadArray([], __read(this.propKeys), false));
        group.propKeys.forEach(function (key) {
            g.propKeys.add(key);
        });
        return g;
    };
    return GroupMeta;
}());
exports.GroupMeta = GroupMeta;
