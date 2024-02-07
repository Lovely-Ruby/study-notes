const Koa = require('koa');
const Router = require('koa-router');
const View = require('koa-views'); // 页面引擎
const Static = require('koa-static'); // 处理静态资源
const { koaBody } = require('koa-body'); // POST ctx.body 数据请求的解析

const app = new Koa();
const router = new Router();

app.use(Static(__dirname + '/static'));
app.use(View(__dirname + '/views'), {
  extension: 'html',
});
app.use(koaBody({ multipart: true }));

router.get('/', async (ctx, next) => {
  await ctx.render('koa_index.html');
});

router.post('/user', async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = {
    info: '请求成功',
  };
});

app.use(router.routes());
app.listen(3000);
