let inputs = document.querySelectorAll('input');
// ctrl + 鼠标 点击 querySelectAll 后，跳转到 lib.dom.d.ts 这个文件是 vscode 自带的，用来做语法智能提示
// vscode 编辑器是用 node + electron + typescript 构造的
// https://www.electronjs.org/

let button = document.querySelector('button');
let span = document.querySelector('span');

button.onclick = function () {
  // 数据的类型安全
  let result: number = Number(inputs[0].value) + Number(inputs[1].value);
  span.innerHTML = result.toString();
};

function add(x: number, y: number): number {
  return x + y;
}

add(1, 2);
