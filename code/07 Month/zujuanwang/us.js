
(async function () {
    'use strict';
    // 一秒之后开始轮询
    const time1 = setInterval(() => {
      const className = '.questype-body .ques-item';
      let ques = document.querySelectorAll(className);
      if (ques.length === 0) {
        const time2 = setInterval(() => {
          ques = document.querySelectorAll(className);
          clearInterval(time2);
        });
      } else {
        //   console.log(ques);
        clearInterval(time1);
        try {
          setInterval(() => {
            let quesitem = document.querySelectorAll('div.ques-item');
            //   console.log(quesitem);
            quesitem.forEach((i) => {
              // console.log(i.getBoundingClientRect());
              const { x, y, top, left, height, width } = i.getBoundingClientRect();
              var simulateClick = new MouseEvent('click', {
                bubbles: true,
                cancelable: false,
                clientX: x + 20,
                clientY: y + 20,
              });
              i.dispatchEvent(simulateClick);
            });
          }, 1000);
        } catch (err) {
          // console.log(err);
        }
      }
    }, 1000);
    document.addEventListener('click', function (e) {
      var x = e.clientX;
      var y = e.clientY;
      // console.log('鼠标点击事件坐标值是：' + x + ', ' + y);
    });
  })();
  