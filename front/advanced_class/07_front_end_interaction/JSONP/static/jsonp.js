function ajax(options) {
  // 第一个参数理解为默认的，第二个参数是用户传递的
  const opts = {
    method: 'get',
    url: '',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    jsonp: 'cb',
    data: '',
    success() {},
    ...options,
  };

  if (opts.dataType === 'jsonp') {
    // 做跨域的处理
    jsonpFunc(opts.url, opts.data, opts.jsonp, opts.success);
    return; // 这里记得return截断
  }

  function jsonpFunc(url, data, cbName, cbFunc) {
    const randomFunc = `myRandomFunciotn${Math.random().toString().substr(2)}`; // substr 截取
    window[randomFunc] = cbFunc; // window 注册此函数
    const path = `${url}?${o2u(data)}&${cbName}=${randomFunc}`;
    // console.log(path);
    const myScript = document.createElement('script');
    myScript.src = path;
    document.querySelector('head').appendChild(myScript);
  }

  const xhr = new XMLHttpRequest();
  if (options.method == 'get') {
    const data = o2u(opts.data);
    options.url = `${options.url}?${data}`;
  }
  xhr.open(options.method, options.url, true);
  for (const key in opts.headers) {
    xhr.setRequestHeader(key, opts.headers[key]);
  }
  let sendData;
  switch (opts.headers['content-type']) {
    case 'application/x-www-form-urlencoded':
      sendData = o2u(opts.data);
      break;
    case 'application/json':
      sendData = JSON.stringify(opts.data);
      break;
  }
  xhr.onload = function () {
    let resData;
    if (xhr.getResponseHeader('content-type').includes('xml')) {
      resData = xhr.responseXML;
    } else {
      resData = JSON.parse(xhr.responseText);
    }
    options.success(resData);
  };
  if (options.method == 'get') {
    xhr.send();
  } else {
    xhr.send(sendData);
  }
}

// 把对象传换成 queryString，就是 get 请求后面的 ? &
function o2u(obj) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  return keys
    .map((v, k) => {
      return `${v}=${values[k]}`;
    })
    .join('&');
}
