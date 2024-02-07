// 参数默认值的基本使用
// 限定参数的值:联合类型 |
function sort(items, order) {
    if (order === void 0) { order = 'desc'; }
}
sort([1, 2, 3], 'asc');
sort([1, 2, 3]);
// sort([1, 2, 3], 'haha'); // 报错
