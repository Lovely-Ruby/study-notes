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
var User = /** @class */ (function () {
    function User(id, username) {
        this.id = id;
        this.username = username;
        // 可以省略初始化赋值
    }
    User.prototype.postArticle = function (title, content) {
        console.log(this.username + " \u53D1\u8868\u4E86\u4E00\u7BC7\u6587\u7AE0\uFF1A " + title);
    };
    return User;
}());
var VIP = /** @class */ (function (_super) {
    __extends(VIP, _super);
    function VIP(id, username, score) {
        if (score === void 0) { score = 0; }
        var _this = _super.call(this, id, username) || this;
        _this.score = score;
        return _this;
    }
    // 重写（覆盖）父类的方法：标志是，函数参数的个数和类型一直
    VIP.prototype.postArticle = function (title, content) {
        console.log("\u91CD\u5199\u7684\u65B9\u6CD5");
    };
    return VIP;
}(User));
var vip3 = new VIP(1, '蔡徐坤');
vip3.postArticle('title', 'contents');
