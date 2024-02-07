const utils = {
  extends(a, b, context) {
    // for in 遍历对象，也会遍历到原型上的属性
    for (const key in b) {
      // 防止混到原型链上
      // eslint-disable-next-line no-prototype-builtins
      if (b.hasOwnProperty(key)) {
        if (typeof b[key] === 'function') {
          // a[key] = b[key]
          a[key] = b[key].bind(context);
        } else {
          a[key] = b[key];
        }
      }
    }
  },
};

// 拦截器管理器：只是维护拦截器队列
class InterceptorsManager {
  constructor() {
    this.handlers = [];
  }

  // 传递成功，失败的回调函数
  use(fulfilled, rejected) {
    this.handlers.push({ fulfilled, rejected }); // 保存
  }
}

// 把核心功能放到类里
class MyAxios {
  constructor() {
    this.interceptors = {
      request: new InterceptorsManager(),
      response: new InterceptorsManager(),
    };
  }

  request(config) {
    // 整理队列
    const missionQuery = [this.xhr, undefined]; // 保存的是 promise 队列

    this.interceptors.request.handlers.forEach((interceptor) => {
      missionQuery.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.handlers.forEach((interceptor) => {
      missionQuery.push(interceptor.fulfilled, interceptor.rejected);
    });
    console.log(missionQuery);
    // 执行队列，封装任务成 promise
    let promise = Promise.resolve(config); //
    while (missionQuery.length > 0) {
      promise = promise.then(missionQuery.shift(), missionQuery.shift());
    }
    return promise;
  }

  xhr(config) {
    return new Promise((resolve, reject) => {
      const { url = '', method = 'get', header = {} } = config;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = function () {
        resolve(xhr.responseText);
      };
      xhr.send();
    });
  }
}

const methodArray = ['get', 'post', 'options', 'delete'];
methodArray.forEach((method) => {
  MyAxios.prototype[method] = function (url, data, options) {
    const config = {
      url,
      data,
      options,
    };
    return this.request(config);
  };
});

// 外面包装一层，把请求的函数暴露出去
const createInstance = function () {
  // console.dir(MyAxios)
  const context = new MyAxios();
  const instance = context.request.bind(context);
  // 这里也要绑定context，不然报错，this.xhr 找不到

  // 把类原型上的方法，混入（扩展）到实例化的 instance 上去
  utils.extends(instance, MyAxios.prototype, context); // 混入方法
  utils.extends(instance, context); // 混入属性，为了写过滤器做准备
  // console.dir(instance)
  // console.dir(object);
  // 打印出该对象的所有属性和属性值.
  // 这个东西不像是 log 一样，前面还能写备注
  return instance;
};

const myaxios = createInstance();
