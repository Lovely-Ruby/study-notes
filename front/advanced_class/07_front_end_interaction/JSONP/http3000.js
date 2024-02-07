const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(Static(__dirname + `/static`));

router.get('/getAjax', (ctx) => {
  ctx.body = {
    info: '请求成功',
  };
});

app.use(router.routes());
app.listen(3000);
