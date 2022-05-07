"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentMeta = void 0;
var BoxDescriptor_1 = require("../BoxDescriptor");
var immutable_1 = require("immutable");
var GroupMeta_1 = require("./GroupMeta");
var PropMeta_1 = require("./PropMeta");
var ComponentMeta = /** @class */ (function () {
    // cache: KeyValueCache<any>
    function ComponentMeta(config) {
        var e_1, _a, e_2, _b;
        this.name = config.name;
        this.group = config.group;
        this.image = config.image;
        this.title = config.title;
        this.box = new BoxDescriptor_1.BoxDescriptor(config.box);
        this.intrinsic = config.intrinsic;
        this.url = config.url;
        this.style = config.style;
        this.defaultProps = config.defaultProps;
        this.imageUrl = config.imageUrl;
        //     this.componentType = config.componentType || 'react'
        this.editor = config.editor;
        this.props = {};
        this.groups = [];
        if (config.editor && config.editor.groups) {
            try {
                for (var _c = __values(config.editor.groups), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var group = _d.value;
                    this.groups.push(GroupMeta_1.GroupMeta.of(group));
                    try {
                        for (var _e = (e_2 = void 0, __values(group.props || [])), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var prop = _f.value;
                            if (prop.name) {
                                this.props[prop.name] = new PropMeta_1.PropMeta(prop);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    ComponentMeta.prototype.createDataFromJson = function (json) {
        var box = new BoxDescriptor_1.BoxDescriptor(json.box, this);
        return (0, immutable_1.fromJS)(__assign(__assign({}, json), { box: box }));
    };
    ComponentMeta.prototype.createData = function (id, box) {
        var _this = this;
        var data = (0, immutable_1.Map)({
            id: id,
            parent: null,
            name: this.name,
            group: this.group,
            style: (0, immutable_1.Map)(),
            children: [],
            allowDrag: true,
            isMoving: false,
            editMode: false,
            passProps: (0, immutable_1.fromJS)(this.defaultProps || {}),
            box: box
        });
        data = data.update("style", function (style) {
            var metaStyle = (0, immutable_1.fromJS)(_this.style);
            return style.merge(metaStyle);
        });
        return data;
    };
    return ComponentMeta;
}());
exports.ComponentMeta = ComponentMeta;
