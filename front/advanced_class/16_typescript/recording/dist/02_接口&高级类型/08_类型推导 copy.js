// 自动推断 x 为 number
var x = 1;
// 不能将类型“"a"”分配给类型“number”
// x = 'a';
// 函数参数类型、函数返回值会根据对应的默认值和返回值进行自动推断
function fn(a) {
    if (a === void 0) { a = 1; }
    return a * a;
}
