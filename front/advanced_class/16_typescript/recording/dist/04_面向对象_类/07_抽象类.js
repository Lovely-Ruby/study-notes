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
var Component = /** @class */ (function () {
    function Component(props) {
        this.props = props;
    }
    return Component;
}());
var Mycomponent = /** @class */ (function (_super) {
    __extends(Mycomponent, _super);
    function Mycomponent(props) {
        return _super.call(this, props) || this;
    }
    Mycomponent.prototype.render = function () {
        this.props.value;
        return "<myComponent />";
    };
    Mycomponent.prototype.getInfo = function () {
        return "\u7EC4\u4EF6\uFF1AMyComponent\uFF0Cprops\uFF1A" + this.props + "\uFF0Cstate\uFF1A" + this.state;
    };
    return Mycomponent;
}(Component));
var myComponents = new Mycomponent({ name: '我的组件' });
myComponents.render();
