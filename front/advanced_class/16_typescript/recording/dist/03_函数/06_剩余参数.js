// // 剩余参数是一个数组
// interface IObj {
//   [key: string]: any;
// }
// function merge(target: IObj, ...others: Array<IObj>) {
//   // https://blog.csdn.net/S_clifftop/article/details/106428180
//   return (<any>Object).assign(target, ...others);
//   //   return {
//   //     ...target,
//   //     ...others,
//   //   };
// }
// let newObj = merge({ x: 1 }, { y: 2 }, { z: 3 });
