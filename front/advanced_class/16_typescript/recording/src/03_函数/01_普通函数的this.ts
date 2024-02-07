// interface T {
//   a: number;
//   fn: (x: number) => void;
// }

// // 对于普通函数而言，`this` 是会随着调用环境的变化而变化的
// // 所以默认情况下，普通函数中的 `this` 被标注为 `any`，
// // 但我们可以在函数的第一个参数位（它不占据实际参数位置）上显式的标注 `this` 的类型
// let obj: T = {
//   a: 1,
//   fn(this: T, x: number) {
//     // (<T>this).a; // 断言
//     this.a;
//   },
// };
