const Koa = require('koa');
const View = require('koa-views');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const Static = require('koa-static');
const fs = require('fs');
const { exists } = require('fs');
const app = new Koa();
const router = new Router();
app.use(View(__dirname));
app.use(Static(__dirname));
/**
 * 设置上传文件大小最大限制，默认1000M
 * https://github.com/node-formidable/formidable
 */
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024, 
    },
  })
);
// 异步函数
router.get('/', async (ctx, next) => {
  await ctx.render('index.html');
});
/**
 * 说明：
 * fs.exists() 已弃用，但 fs.existsSync() 不是。
 * fs.exists() 的 callback 参数接受与其他 Node.js 回调不一致的参数。 fs.existsSync() 不使用回调
 * 参考地址：https://nodejs.cn/api/fs/fs_existssync_path.html
 */
router.post('/upload', async (ctx, next) => {
  try {
    //   console.log('ctx.request.files:>>', ctx.request.files);
    //   console.log('ctx.request.body:>>', ctx.request.body);
    const data = ctx.request.files.data;
    const { filepath, originalFilename } = data;
    if (!fs.existsSync(`static`)) {
      fs.mkdirSync('static');
    }
    const readFile = fs.readFileSync(filepath);
    fs.writeFileSync(`static/${originalFilename}`, readFile);
    ctx.body = '请求成功';
  } catch (err) {
    console.log(err);
  }
});

app.use(router.routes());
app.listen(3000, () => {
  console.log('server start:>>', 'http://localhost:3000');
});
