const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new Router();
app.use(KoaBody());
app.use(Static(`${__dirname}/static`));

router.get('/jsonpRequest', (ctx) => {
  ctx.body = {
    info: 'hello world',
  };
});
app.use(router.routes());
app.listen(3000);
