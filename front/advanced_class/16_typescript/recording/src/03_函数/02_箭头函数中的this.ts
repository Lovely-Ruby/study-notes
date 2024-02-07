// interface T {
//   a: number;
//   fn: (x: number) => void;
// }

// // 箭头函数的 this 是固定的
// // 就是在定义箭头函数时所在的环境
// // 例子中的箭头函数的this 就是fn的this
// // 那么想要控制箭头函数的this，就只需要改变fn的this 即可
// let obj1 = {
//   a: 1,
//   fn(this: Window, x: number) {
//     return () => {
//       this;
//     };
//   },
// };
