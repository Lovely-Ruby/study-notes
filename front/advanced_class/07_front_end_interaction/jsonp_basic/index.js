const Koa = require('koa');
const Router = require('koa-router');
const Static = require('koa-static');
const KoaBody = require('koa-body');
const fs = require('fs');

const app = new Koa();
const router = new Router();

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1024 * 1024 * 100, // 这里控制上传文件的大小，单位是 bit
    },
  })
);

app.use(Static(`${__dirname}/static`));

router.get('/', (ctx) => {
  ctx.body = {
    info: '访问成功',
  };
});

router.post('/uploadImage', (ctx) => {
  console.log(ctx.request.body);
  console.log(ctx.request.files);
  ctx.body = {
    info: '返回成功',
  };
});

app.use(router.routes());
app.listen(3000);
