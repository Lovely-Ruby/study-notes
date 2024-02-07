var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
  //   console.log(this);
  //   console.log(e);
  container.innerHTML = count++;
}

function debounce(fn, wait, immediate) {
  let timeout = null;
  let result;

  return function () {
    const arg = arguments;
    const _this = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      let callNow = !timeout;
      console.log(callNow);
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        result = fn.apply(_this, arg);
      }
    } else {
      timeout = setTimeout(function () {
        fn.apply(_this, arg);
      }, wait);
    }
    return result;
  };
}

container.onmousemove = debounce(getUserAction, 200, true);
// container.onmousemove = getUserAction;
