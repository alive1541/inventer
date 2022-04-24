"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = exports.LinkedList = void 0;
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.size = 0;
        this.head = new ListNode(null);
        this.tail = this.head;
    }
    LinkedList.prototype.push = function (data) {
        var node = new ListNode(data);
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        this.size++;
    };
    LinkedList.prototype.clear = function () {
        this.head = new ListNode(null);
        this.tail = this.head;
        this.size = 0;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var ListNode = /** @class */ (function () {
    function ListNode(data) {
        this.next = null;
        this.prev = null;
        this.data = data;
    }
    return ListNode;
}());
exports.ListNode = ListNode;
