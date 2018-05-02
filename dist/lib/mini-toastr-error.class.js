"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MiniToastrError = (function (_super) {
    __extends(MiniToastrError, _super);
    function MiniToastrError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'MiniToastrError';
        return _this;
    }
    return MiniToastrError;
}(Error));
exports.MiniToastrError = MiniToastrError;
//# sourceMappingURL=mini-toastr-error.class.js.map