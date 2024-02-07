/**
 * 学习：__dirname 就是跟文件一起的，不会因为引用关系而恒定
 */
// console.log(__dirname);
const fse = require('fs-extra');
const path = require('path');
/* 
console.log('path.resolve()                      ', path.resolve());
console.log('path.resolve(__dirname)             ', path.resolve(__dirname));
console.log("path.resolve('/public')             ", path.resolve('/public'));
console.log("path.resolve('./public')            ", path.resolve('./public'));
console.log("path.resolve('../public')           ", path.resolve('../public'));
console.log("path.resolve('..')                  ", path.resolve('..'));
console.log("path.resolve('..', '..')            ", path.resolve('..', '..'));
console.log("path.resolve('../..')               ", path.resolve('../..'));
console.log("path.resolve('..', 'public')        ", path.resolve('..', 'public')); 
*/

/**
 * 功能：处理 POST 请求
 * - 与 GET 数据相比，POST 数据量大，需要分段。
 * - 通过 req.on('data', function(data) {}) 监听
 * - 当有一段数据到达的时候执行回调，回调函数参数 data 为每段达到的数据。
 * - 当数据全部到达时会触发 req.on('end', function() {}) 里面的回调函数。
 * - 可以通过 JSON.parse(str) 解析成我们想要的 POST 请求数据格式。
 * - 参考资料：https://juejin.cn/post/7142700338414518286#heading-2
 * @param {*} req
 * @returns
 */
function handlePostData(req) {
  return new Promise((resolve, reject) => {
    let allData = '';
    let i = 0;
    req.on('data', function (chunkData) {
      //   console.log(`第 ${++i} 次收到数据`);
      allData += chunkData;
    });
    req.on('end', function () {
      const POST_MESSAGE = JSON.parse(allData);
      resolve(POST_MESSAGE);
    });
  });
}

function padS(data, count = 4) {
  return String(data).padStart(count, 0);
}

/**
 * 功能：创建 pipe 写文件流
 * - 1. [首先了解一下什么是输入可读流](https://www.jmjc.tech/less/111)
 * - 方便记忆：可读流 通过 管道 流入 可写流。    可读流  =======> 可写流
 * - 2. hasMergeChunk 变量用于记录一下那些已经合并完成了，也可以写成数组，都行。
 * - 3. 可以检测可读流的 end 事件，表示我这个 chunk 已经流完了，然后写一下善后逻辑。
 * @param {*} path
 * @param {*} writeStream
 * @returns
 */
let hasMergeChunk = {};
function pipeStream(path, writeStream, length) {
  return new Promise((resolve) => {
    const readStream = fse.createReadStream(path);
    readStream.pipe(writeStream);
    readStream.on('end', function () {
      hasMergeChunk[path] = 'finished';
      fse.unlinkSync(path);
      resolve();
      const merging = path.split('_')[1];
      const merged = Object.keys(hasMergeChunk).length;
      console.log(`merging: No.${padS(merging)}.   progress: [ ${padS(merged)} / ${padS(length)} ]`);
    });
  });
}

/**
 * 功能：合并 chunks
 * - 1. 首先根据 fileChunksDir 拿到所有 chunks 的文件名
 * - 2. 然后拼接成 fileAllChunksPaths <Array> 数组，然后一一创建可写流
 * - 3. fileAllChunksPaths 注意这里需要排序一下，不然就是乱的，这也是我们创建可写流 srart 位置的基础
 * - 4. 然后这里通过 pipeStream 函数用 Promise 包装了一下可读流，代码需要慢慢读去理解。
 * - 5. 我们这里的 可写流们，是根据 chunks 的不同，定义好写入的文件 path，
 * - 以及每个块儿写的开始位置和写入大小，每个可写流都是不一样的！
 * -
 * @param {*} param0
 */
async function handleMergeChunks({ chunksPath, mergeFilePath, fileName, eachChunkSize, fileHash }) {
  hasMergeChunk = {};
  const fileChunksDir = `${chunksPath}/${fileHash}`;
  const fileAllChunksPaths = await fse.readdir(fileChunksDir);
  console.log(fileAllChunksPaths);
  fileAllChunksPaths.sort((a, b) => a.split('_')[1] - b.split('_')[1]);
  const promiseArray = fileAllChunksPaths.map((chunk, index, array) => {
    const eachChunkPath = `${fileChunksDir}/${chunk}`;
    const writeStream = fse.createWriteStream(mergeFilePath, {
      start: index * eachChunkSize,
    });
    return pipeStream(eachChunkPath, writeStream, array.length);
  });
  await Promise.all(promiseArray);
  await fse.removeSync(fileChunksDir);
}

module.exports = {
  handlePostData,
  handleMergeChunks,
};
