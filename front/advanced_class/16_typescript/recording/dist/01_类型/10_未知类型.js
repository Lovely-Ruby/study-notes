/**
    ### 未知类型

    <u>unknow</u>，3.0 版本中新增，属于安全版的 <u>any</u>，但是与 any 不同的是：

    - <u>unknow</u> 仅能赋值给 <u>unknow</u>、<u>any</u>
    - <u>unknow</u> 没有任何属性和方法
 */
// let a: any = '我是字符串';
// let b: number = 123;
// b = a; // any 类型能够赋值给任何类型
// b.toFixed(2); // 这里会有隐式的错误，但是 ide 不报错，解决的办法就是 unknown
// let a: unknown = '我是字符串';
// let b: number = 123;
// b = a; // unknown 类型不能够赋值给其他
// b.toFixed(2); // 这里会有隐式的错误，但是 ide 不报错，解决的办法就是 unknown
// unknown 比 any 更严格，是一个安全版的 any 类型
