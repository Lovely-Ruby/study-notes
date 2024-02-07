// // 关注参数的类型、返回值的类型
// // function fn(x: string): string {
// //   return '';
// // }

// // let fn3: (a: string) => string = function (a) {
// //   return '';
// // };

// // 用type标注
// type callback = (a: string) => string;

// let fn4: callback = function (a) {
//   return '';
// };

// // 用接口标注
// interface ICallBack {
//   (a: string): string;
// }
// let fn5: ICallBack = function (c) {
//   return '';
// };
