const Koa = require('koa');
const Static = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
app.use(Static(`${__dirname}/static`));
app.use(router.routes());
const port = 3000;
app.listen(port, () => {
  console.log(`listen ${port}.`);
});
