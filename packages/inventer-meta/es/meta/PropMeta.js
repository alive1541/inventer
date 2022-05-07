"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropMeta = void 0;
var PropMeta = /** @class */ (function () {
    function PropMeta(config) {
        this.config = config;
        this.path = config.path.split('.');
    }
    PropMeta.setPropValue = function (path, data, value) {
        if (path[0] === 'rect') {
            var rect = data.get('rect').clone();
            rect[path[1]] = value;
            return data.set('rect', rect);
        }
        if (path[0] === 'box') {
            var box = data.get('box');
            box[path[1]] = value.clone();
            console.log(value);
            return data;
        }
        return data.setIn(path, value);
    };
    PropMeta.getPropValue = function (path, data) {
        if (path[0] === 'rect') {
            return data.get('rect')[path[1]];
        }
        if (path[0] === 'box') {
            return data.get('box')[path[1]];
        }
        return data.getIn(path);
    };
    return PropMeta;
}());
exports.PropMeta = PropMeta;
