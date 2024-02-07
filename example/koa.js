const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');

let app = new Koa();
let router = new Router();
router.get('/getUserInfo', async (ctx, next) => {
  // ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = {
    code: 200,
    data: {
      count: 450,
    },
  };
});
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET'],
  })
);
app.use(router.routes());
app.listen(3000, () => {
  console.log(`open http://localhost:3000`);
});
