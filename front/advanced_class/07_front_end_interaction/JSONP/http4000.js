const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static');
const Views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(Views(`${__dirname}/static`));
app.use(Static(`${__dirname}/static`));

router.get('/getAjax', (ctx) => {
  console.log('请求到了');
  console.log(ctx.query);
  const { cb } = ctx.query;
  const data = {
    a: 1,
    b: 2,
    c: 3,
  };
  ctx.body = `${cb}(${JSON.stringify(data)})`;
});

app.use(router.routes());
app.listen(4000);
