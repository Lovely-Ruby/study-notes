// /**
//  * 有的时候，同一个函数会接收不同类型的参数返回不同类型的返回值，
//  * 我们可以使用函数重载来实现，通过下面的例子来体会一下函数重载
//  */
// // 函数重载，相当于定义了两套规则，而不是排列组合
// // - 重载函数类型只需要定义结构，不需要实体，类似接口
// function showOrHide(
//   ele: HTMLElement,
//   attr: 'display',
//   value: 'block' | 'none'
// ): void;
// function showOrHide(ele: HTMLElement, attr: 'opacity', value: number): void;
// function showOrHide(ele: HTMLElement, attr: any, value: any) {
//   // 实体函数
// }
// var div = document.querySelector('div');
// if (div) {
//   showOrHide(div, 'display', 'none');
//   showOrHide(div, 'opacity', 1);
//   showOrHide(div, 'display', 1); // 函数重载后这个就不对的
// }
// // function showOrHide(
// //     ele: HTMLElement,
// //     attr: string,
// //     value: 'block' | 'none' | number
// //   ) {}
// //   let div = document.querySelector('div');
// //   if (div) {
// //     showOrHide(div, 'display', 'none');
// //     showOrHide(div, 'opacity', 1);
// //     // error，这里是有问题的，虽然通过联合类型能够处理同时接收不同类型的参数
// //     // 但是多个参数之间是一种组合的模式，我们需要的应该是一种对应的关系
// //     showOrHide(div, 'display', 1);
// //   }
