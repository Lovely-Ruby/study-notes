const Koa = require('koa');
const Static = require('koa-static');
const Router = require('koa-router');

const router = new Router();
const app = new Koa();
app.use(Static(`${__dirname}/static`));
router.all('/myaxios_api', (ctx) => {
  ctx.body = {
    code: 0,
    message: '请求成功',
  };
});
app.use(router.routes());
app.listen(3000);
