const Koa = require('koa');
const Views = require('koa-views');
const Router = require('koa-router');
const Static = require('koa-static');
const { koaBody } = require('koa-body');
const fse = require('fs-extra');

const app = new Koa();
const router = new Router();
app.use(Views(__dirname));
app.use(Static(__dirname));
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024,
    },
  })
);

router.get('/', async (ctx) => {
  await ctx.render('index.html');
});

/**
 * 功能：上传接口
 * - 从 ctx.request.body 中获取 hash 以及 filename
 * - 从 ctx.request.files 中拿到分片数据
 * - 然后再把 node 帮我们临时存放的 chunk 文件的 filepath 拿到，之后移动到我们想要存放的路径下
 * - filepath 和 hash 是一一对应的关系
 */
router.post('/upload', async (ctx) => {
  const { hash, filename } = ctx.request.body;
  const { filepath } = ctx.request.files?.chunk;
  const chunkPath = `${__dirname}/chunkPath/${filename}`;
  if (!fse.existsSync(chunkPath)) {
    await fse.mkdirs(chunkPath);
  }
  await fse.move(filepath, `${chunkPath}/${hash}`);
  ctx.body = {
    code: 1,
  };
});

/**
 * 功能：创建 pipe 写文件流
 * - 1. [首先了解一下什么是输入可读流](https://www.jmjc.tech/less/111)
 * - 2. hasMergeChunk 变量用于记录一下那些已经合并完成了，也可以写成数组，都行。
 * - 3. 可以检测可读流的 end 事件，表示我这个 chunk 已经流完了，然后写一下善后逻辑。
 * @param {*} path
 * @param {*} writeStream
 * @returns
 */
let hasMergeChunk = {};
function pipeStream(path, writeStream) {
  return new Promise((resolve) => {
    const readStream = fse.createReadStream(path); // 可读流
    readStream.pipe(writeStream); // 可读流通过管道流向可写流
    readStream.on('end', () => {
      hasMergeChunk[path] = 'finish';
      fse.unlinkSync(path); // 删除此文件
      resolve();
      console.log(`合并 No.${path.split('_')[1]}, 已经合并${Object.keys(hasMergeChunk).length}`);
    });
  });
}

/**
 * 功能：合并 Chunk
 * - 1. chunkDir: 是 chunks 文件们所在的文件夹的路径
 * - 2. chunkPaths: 是个 Array，数组中包含所有的 chunk 的 path
 * - 3. 因为 每个 chunk 的 path 命名是通过 hash 组成的，所以我们先排序一下，
 * - 算是为 createWriteStream 中的 start 做准备
 * - 4. 为每个 chunk 的 path 创建写入流，写到 mergePath 这个路径下。因为已经
 * - 排序了，所以 start 就是每个文件的 index * eachChunkSize
 * - 5. 每个写入流都用 Promise 包装了一下，然后用 await Promise.all() 等待处理完
 * @param {*} mergePath
 * @param {*} name
 * @param {*} eachChunkSize
 */
async function mergeChunk(mergePath, name, eachChunkSize) {
  const chunkDir = `${__dirname}/chunkPath/${name}`;
  const chunkPaths = await fse.readdir(chunkDir);
  chunkPaths.sort((a, b) => a.split('_')[1] - b.split('_')[1]);

  await Promise.all(
    chunkPaths.map((chunk, index) => {
      const eachChunkPath = `${chunkDir}/${chunk}`;
      // 创建输入流，并为每个 chunk 定好位置
      const writeStream = fse.createWriteStream(mergePath, {
        start: index * eachChunkSize,
      });
      return pipeStream(eachChunkPath, writeStream);
    })
  );
  console.log('合并完成');
  fse.rmdirSync(chunkDir);
  console.log(`删除 ${chunkDir} 文件夹`);
}

/**
 * 功能: merge 接口
 * - hasMergeChunk 变量是上面用来记录的
 * - mergePath 定义一下合并后的文件的路径
 */
router.post('/merge', async (ctx) => {
  // console.log(ctx.request.body);
  const { fileName, size } = ctx.request.body;
  hasMergeChunk = {};
  const mergePath = `${__dirname}/merge/${fileName}`;
  if (!fse.existsSync(`${__dirname}/merge`)) {
    fse.mkdirSync(`${__dirname}/merge`);
  }
  await mergeChunk(mergePath, fileName, size);
  ctx.body = {
    data: '成功',
  };
});

app.use(router.routes());
app.listen(3000, () => {
  console.log(`server start: http://localhost:3000`);
});
