/**
 * 功能：封装请求
 * - 1. xhr.upload.onprogress 注意不要拉下 upload
 * @param {*} param0
 * @returns
 */
function request({ url, method = 'post', data, headers = {}, onprogress = (e) => e, xhrList }) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach((item) => {
      xhr.setRequestHeader(item, headers[item]);
    });
    xhr.upload.onprogress = onprogress;
    xhr.onload = function (e) {
      if (xhrList) {
        const currXhrIndex = xhrList.findIndex((i) => i === xhr);
        xhrList.splice(currXhrIndex, 1);
      }
      resolve({
        data: e.target.response,
      });
    };
    xhr.send(data);
    xhrList?.push(xhr);
  });
}
