const Koa = require('koa');
const Static = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
app.use(Static(`${__dirname}/static`));
router.all('/myaxios_api', (ctx) => {
  ctx.body = {
    code: 0,
    message: '请求成功',
  };
});
app.use(router.routes());
app.listen(3000, () => console.log('listen 3000'));
