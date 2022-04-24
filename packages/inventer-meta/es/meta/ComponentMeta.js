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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentMeta = void 0;
var BoxDescriptor_1 = require("../BoxDescriptor");
var immutable_1 = require("immutable");
var ComponentMeta = /** @class */ (function () {
    // componentType: 'react' | 'vue'
    // props: { [name: string]: PropMeta }
    // groups: Array<GroupMeta>
    // cache: KeyValueCache<any>
    function ComponentMeta(config) {
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
        //     this.editor = config.editor
        // this.props = {}
        //     this.groups = []
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
