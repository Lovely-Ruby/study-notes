// 拦截器管理器，只用来保存拦截器的队列
class IntercetporsManager {
  constructor() {
    this.handlers = [];
  }

  use(fulfilled, rejected) {
    this.handlers.push({ fulfilled, rejected });
  }
}

class MyAxios {
  constructor() {
    this.interceptors = {
      request: new IntercetporsManager(),
      response: new IntercetporsManager(),
    };
  }

  request(config) {
    const missionQuery = [this.xhr, undefined];
    // 推入队列都是一对的，代表成功和失败的回调函数
    this.interceptors.request.handlers.forEach((interceptor) => {
      missionQuery.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.handlers.forEach((interceptor) => {
      missionQuery.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise = Promise.resolve(config);
    while (missionQuery.length > 0) {
      promise = promise.then(missionQuery.shift(), missionQuery.shift());
    }
    return promise;
  }

  xhr(config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { url = '', method = 'get' } = config;
      xhr.open(method, url, true); // 异步
      xhr.onload = function () {
        resolve(xhr.responseText);
      };
      xhr.send();
    });
  }
}

const methodsArray = ['post', 'get', 'delete', 'put', 'head'];

methodsArray.forEach((method) => {
  MyAxios.prototype[method] = function (url) {
    const config = {
      url,
      method,
    };
    // console.log(this) // 这个 this 指向的是实例化对象,
    // 实例化对象上本身没有request 方法，但是原型链上有
    return this.request(config);
  };
});

// Object.prototype.myFun = function () {
//     console.log('i m handsome')
// }

const utils = {
  // 我们要把原始的混入到新的
  extends(origin, newBoy, context) {
    // 把 origin 上的方法混入到 newBody 上
    for (const key in origin) {
      // eslint-disable-next-line no-prototype-builtins
      if (origin.hasOwnProperty(key)) {
        if (typeof origin[key] === 'function') {
          // 把 MyAxios.prototype 原型上的方法，指给实例化对象 myaxios 上，赋值给 instance 上
          newBoy[key] = origin[key].bind(context);
          // 不绑定的话。上面指定的是函数
          // 绑定的话，上面指定的是 MyAxios 类。
        } else {
          newBoy[key] = origin[key];
        }
      }
    }
  },
};

function createInstance() {
  const myaxios = new MyAxios();
  const instance = myaxios.request.bind(myaxios); // 这里记得绑定 myaxios
  utils.extends(MyAxios.prototype, instance, myaxios);
  utils.extends(myaxios, instance);
  return instance;
}

// eslint-disable-next-line no-unused-vars
const myaxios = createInstance();
