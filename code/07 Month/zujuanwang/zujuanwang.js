// ==UserScript==
// @name         组卷网
// @namespace    http://tampermonkey.net/
// @version      2024-01-24
// @description  try to take over the world!
// @author       You
// @match        https://zujuan.xkw.com/zujuan
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xkw.com
// @grant        none
// ==/UserScript==

/*
 * fileName: txt文件名称
 * content：文件内容(string)
 */
function downloadTxt(fileName, content) {
  let blob = new Blob([content], {
    type: 'text/javascript;charset=utf-8',
  });
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function (e) {
    let a = document.createElement('a');
    a.download = fileName;
    a.href = e.target.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}

function checkQues() {
  'use strict';
  const TIME = 1000;
  return new Promise((resolve, response) => {
    const interval = setInterval(() => {
      const className = '.questype-body .ques-item';
      let doms = document.querySelectorAll(className);
      if (doms.length > 0) {
        resolve(doms);
        clearInterval(interval);
      } else {
        ques = document.querySelectorAll(className);
      }
    }, TIME);
  });
}

function clickDom() {
  return new Promise((resolve) => {
    const divs = document.querySelectorAll('.quesdiv');
    // const divs = document.querySelectorAll('.ques-item');
    // console.log('.ques-item:>>', divs);
    divs.forEach((item) => {
      item.click();
    });
    resolve();
  });
}

function exportExamPage() {
  return new Promise((resolve, reject) => {
    const group_exam_page = document.querySelector('.group-exam-page');
    const str = group_exam_page.outerHTML;
    resolve(str);
  });
}

function createExportButton() {
  const btn = document.createElement('button');
  btn.innerHTML = '<span style="padding:0 6px">导 出<span>';
  btn.setAttribute('style', 'position: fixed; bottom: 1rem; left: 6rem; font-size: 20px');
  btn.setAttribute('id', 'exportButton');
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(btn);
  btn.addEventListener('click', async () => {
    const res = await exportExamPage();
    const str = `const mydom = \`${res}\``;
    downloadTxt('data', str);
  });
}

function createAnswerButton() {
  const btn = document.createElement('button');
  btn.innerHTML = '<span style="padding:0 6px">答 案<span>';
  btn.setAttribute('style', 'position: fixed; bottom: 1rem; left: 1rem; font-size: 20px');
  btn.setAttribute('id', 'exportButton');
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(btn);
  btn.addEventListener('click', async () => {
    await clickDom();
  });
}

(async function () {
  'use strict';
  createExportButton();
  createAnswerButton();
  await checkQues();
})();
