"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDto = void 0;
var class_validator_1 = require("class-validator");
var OrderDto = function () {
    var _a;
    var _firebaseUid_decorators;
    var _firebaseUid_initializers = [];
    var _firebaseUid_extraInitializers = [];
    var _OrderInfo_decorators;
    var _OrderInfo_initializers = [];
    var _OrderInfo_extraInitializers = [];
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    return _a = /** @class */ (function () {
            function OrderDto() {
                this.firebaseUid = __runInitializers(this, _firebaseUid_initializers, void 0);
                this.OrderInfo = (__runInitializers(this, _firebaseUid_extraInitializers), __runInitializers(this, _OrderInfo_initializers, void 0));
                this.items = (__runInitializers(this, _OrderInfo_extraInitializers), __runInitializers(this, _items_initializers, void 0));
                __runInitializers(this, _items_extraInitializers);
            }
            return OrderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firebaseUid_decorators = [(0, class_validator_1.IsString)()];
            _OrderInfo_decorators = [(0, class_validator_1.IsObject)()];
            _items_decorators = [(0, class_validator_1.IsArray)()];
            __esDecorate(null, null, _firebaseUid_decorators, { kind: "field", name: "firebaseUid", static: false, private: false, access: { has: function (obj) { return "firebaseUid" in obj; }, get: function (obj) { return obj.firebaseUid; }, set: function (obj, value) { obj.firebaseUid = value; } }, metadata: _metadata }, _firebaseUid_initializers, _firebaseUid_extraInitializers);
            __esDecorate(null, null, _OrderInfo_decorators, { kind: "field", name: "OrderInfo", static: false, private: false, access: { has: function (obj) { return "OrderInfo" in obj; }, get: function (obj) { return obj.OrderInfo; }, set: function (obj, value) { obj.OrderInfo = value; } }, metadata: _metadata }, _OrderInfo_initializers, _OrderInfo_extraInitializers);
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.OrderDto = OrderDto;
