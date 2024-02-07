// // 有的时候，我们希望标注的不是某个类型，而是一个固定值，就可以使用字面量类型，配合联合类型会更有用
// function setPosition(
//   ele: Element,
//   direction: 'left' | 'top' | 'right' | 'bottom'
// ) {
//   // ...
// }
// let box = document.querySelector('div');
// if (box) {
//   // ok
//   setPosition(box, 'bottom');
//   // error
//   // setPosition(box, 'hehe');
// }
