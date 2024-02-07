// // - 如果合并的接口存在同名的非函数成员，则必须保证他们类型一致，否则编译报错
// // - 接口中的同名函数则是采用重载（具体后期函数详解中讲解）

// interface Box {
//   height: number;∑
//   width: number∑;
//   fn(a: number): number;
// }

// interface Box {
//   scale: number;
//   fn(a: string): string; // 函数重载:既可以用上面的函数规则，也可以用下面的函数规则
// }

// let box: Box = {
//   height: 5,
//   width: 6,
//   scale: 10,
//   fn: function (a: any): any {
//     return a;
//   },
// };
