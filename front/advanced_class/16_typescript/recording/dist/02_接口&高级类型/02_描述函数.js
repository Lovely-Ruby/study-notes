// // 使用接口来描述函数
// interface MyFunc {
//   (x: number, y: number): number;
// }
// function fn1(x: number, y: number): number {
//   return x + y;
// }
// function fn2(x: number, y: number): number {
//   return x + y;
// }
// let fn3: MyFunc = function (a: number, b: number): number {
//   return a + b;
// };
// function todo(callback: MyFunc) {
//   let v = callback(1, 2);
// }
// todo(function (a: number, b: number): number {
//   return a + b;
// });
// interface IEventFunc {
//   // 类型标注
//   (e: MouseEvent): void;
// }
// function on(el: HTMLElement, evname: string, callback: IEventFunc): void {}
// let div = document.querySelector('div');
// if (div) {
//   on(div, 'click', function (e) {
//     console.log(e.clientX);
//   });
// }
