"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromocodeTypes = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CREATED"] = "created";
    OrderStatus["PAID"] = "paid";
    OrderStatus["DELIVERY"] = "delivery";
    OrderStatus["COMPLETE"] = "complete";
    OrderStatus["REFUND"] = "refund";
    OrderStatus["REFUND_COMPLETE"] = "refund_complete";
    OrderStatus["REJECTED"] = "rejected";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PromocodeTypes;
(function (PromocodeTypes) {
    PromocodeTypes["DISCOUNT"] = "discount";
    PromocodeTypes["PARTNER"] = "partner";
    PromocodeTypes["PRICE"] = "price";
})(PromocodeTypes || (exports.PromocodeTypes = PromocodeTypes = {}));
//# sourceMappingURL=order.js.map