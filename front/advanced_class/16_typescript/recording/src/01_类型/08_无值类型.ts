// function fn(): void {
//   // return undefined;
//   return null;
// }

// void 和 undefined 没有区别
// let res = fn();

// ### Never类型

// 当一个函数永远不可能执行 `return` 的时候，返回的就是 `never` ，
// 与 <u>void</u> 不同，`void` 是执行了 `return`， 只是没有值，
// `never` 是不会执行 `return`，比如抛出错误，导致函数终止执行

function fn1(): never {
  throw new Error();
}
fn1();
