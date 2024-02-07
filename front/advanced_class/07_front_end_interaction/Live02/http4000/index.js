const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new Router();
app.use(KoaBody());
app.use(Static(`${__dirname}/static`));

// 设置预检请求
router.options('/*', (ctx) => {
  console.log('走了options');
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // 预检请求也需要允许跨域
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , mytest'
  );
  ctx.set('Access-Control-Max-Age', 10); // 单位是秒
  ctx.body = {};
});

router.post('/jsonpRequest', (ctx) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // 建议指定域名

  // 默认前端通过 xhr.getAllResponseHeaders() 是获取不到所有的返回头信息的
  // 那么前端如果想要获取，就需要在这边暴露出来
  // 暴露的话关键字不敏感，大小写都可以，多个参数用逗号分隔
  ctx.set(
    'Access-Control-Expose-Headers',
    'Date, Access-Control-Allow-Origin, mytest'
  );

  console.log('这是4000的端口');
  ctx.body = {
    info: 'hello world',
  };
});

router.post('/proxy', (ctx) => {
  console.log(4000);
  ctx.body = {
    info: '我是4000端口的proxy接口',
  };
});
app.use(router.routes());
app.listen(4000);
