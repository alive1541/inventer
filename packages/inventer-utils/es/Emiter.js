"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emiter = void 0;
var rxjs_1 = require("rxjs");
var Emiter = /** @class */ (function () {
    function Emiter() {
        // 不会超过20个枚举了
        this.observers = new Array(50);
    }
    Emiter.prototype.addObserver = function (topic, observer) {
        if (!this.observers[topic]) {
            this.observers[topic] = [];
        }
        var list = this.observers[topic];
        list.push(observer);
    };
    Emiter.prototype.removeObserver = function (topic, observer) {
        var list = this.observers[topic];
        if (list && list.length > 0) {
            this.observers[topic] = list.filter(function (x) { return x !== observer; });
        }
    };
    Emiter.prototype.on = function (topic) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var addedObservers = [];
            if (Array.isArray(topic)) {
                topic.forEach(function (t) {
                    _this.addObserver(t, observer);
                    addedObservers.push([t, observer]);
                });
            }
            else {
                _this.addObserver(topic, observer);
                addedObservers.push([topic, observer]);
            }
            return {
                unsubscribe: function () {
                    addedObservers.forEach(function (x) { return _this.removeObserver(x[0], x[1]); });
                },
            };
        });
    };
    Emiter.prototype.emit = function (topic, data) {
        if (this.observers[topic]) {
            this.observers[topic].forEach(function (observer) {
                observer.next(data);
            });
        }
    };
    return Emiter;
}());
exports.Emiter = Emiter;
