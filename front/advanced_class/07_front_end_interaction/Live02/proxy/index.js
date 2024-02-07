const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static');
const KoaBody = require('koa-body');
const KoaServerHttpProxy = require('koa-server-http-proxy');

const app = new Koa();
const router = new Router();
app.use(
  KoaServerHttpProxy('/api', {
    target: 'http://localhost:4000',
    pathRewrite: { '^/api': '' },
  })
);
app.use(KoaBody());
app.use(Static(`${__dirname}/static`));

router.get('/proxy', (ctx) => {
  ctx.body = {
    info: '我是不跨域的proxy',
  };
});
app.use(router.routes());
app.listen(3000);
