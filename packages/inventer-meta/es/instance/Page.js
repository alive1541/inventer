"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
var utils_1 = require("@inventer/utils");
var BoxDescriptor_1 = require("../BoxDescriptor");
var Node_1 = require("./Node");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(name, json, loader) {
        var _this = _super.call(this) || this;
        _this.logger = new utils_1.Logger('page');
        _this.name = name;
        _this.id_base = 1;
        _this.nodes = [];
        _this.loader = loader;
        var meta = _this.loader.loadByName('container', 'root');
        var box = new BoxDescriptor_1.BoxDescriptor({
            left: 0,
            top: 0,
            width: 3200,
            height: 3200
        }, meta);
        _this.root = new Node_1.Node(meta, meta.createData(_this.createId(), box));
        _this.linkPage(_this.root);
        _this.links = [];
        Object.keys(json.links).forEach(function (id) {
            _this.links[id] = _this.fromJson(json.links[id]);
        });
        var pageNode = _this.fromJson(json.page);
        pageNode.setAllowDrag(false);
        _this.root.addToAbsolute(pageNode);
        _this.pageNode = pageNode;
        return _this;
    }
    Page.prototype.createId = function () {
        return this.id_base++;
    };
    Page.prototype.linkPage = function (node) {
        this.nodes[node.getId()] = node;
    };
    Page.prototype.fromJson = function (json) {
        var meta = this.loader.loadByName(json.group, json.name);
        var box = new BoxDescriptor_1.BoxDescriptor(json.box, meta);
        if (json.id) {
            this.id_base = Math.max(this.id_base, json.id);
        }
        var id = json.id || this.createId();
        var node;
        if (json.id) {
            var instanceData = meta.createDataFromJson(json);
            node = new Node_1.Node(meta, instanceData);
        }
        else {
            var instanceData = meta.createData(id, box);
            node = new Node_1.Node(meta, instanceData);
        }
        this.linkPage(node);
        return node;
    };
    Page.prototype.cloneNode = function (node, parent) {
        var _this = this;
        var meta = node.meta;
        var data = node.getData()
            .set('id', this.createId());
        var newNode = new Node_1.Node(meta, data);
        if (parent) {
            newNode.setParent(parent);
        }
        this.linkPage(newNode);
        var children = newNode.getChildren()
            .map(function (child) { return _this.cloneNode(child, newNode); });
        newNode.setChildren(children);
        return newNode;
    };
    Page.prototype.createFromMetaNew = function (meta, position) {
        var box = meta.box.clone();
        var id = this.createId();
        var nodeData = meta.createData(id, box);
        var node = new Node_1.Node(meta, nodeData);
        this.linkPage(node);
        return node;
    };
    return Page;
}(utils_1.Emiter));
exports.Page = Page;
