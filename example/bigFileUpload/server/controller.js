/**
 * module.expothis.chunksPathrts 方法用于在服务器端导出模块，并以 CommonJS 格式提供。
 * - 参考：https://www.delftstack.com/zh/howto/node.js/create-and-export-classes/
 */
const multiparty = require('multiparty');
const path = require('path');
const fse = require('fs-extra');
const { handlePostData, handleMergeChunks } = require('./tools');
class Controller {
  constructor(dirPath) {
    this.chunksPath = dirPath;
  }

  /**
   * 功能：验证服务器中是否存在文件
   * - 1. 主要是拼接的任务
   * - 2. ext 的值前面是有 . 的，注意一下。我之前合并好的文件 xxx..mkv 有两个点...
   * - 导致 fse.existsSync 怎么都找不到，哭
   * - 3. 返回已经上传的 chunkList
   * - 这里定义一下状态码吧：
   * - 0 为从未上传过
   * - 1 为服务器上传过部分
   * - 2 为完全上传过，直接妙传
   * @param {*} req
   * @param {*} res
   * @param {*} MERGE_DIR
   */
  async handleVerify(req, res, MERGE_DIR, UPLOAD_DIR) {
    try {
      const postData = await handlePostData(req);
      const { fileHash, fileName } = postData;
      const ext = path.extname(fileName);
      const willCheckMergedName = `${fileHash}${ext}`;
      const willCheckPath = path.resolve(MERGE_DIR, willCheckMergedName);

      // 上传文件的 chunk
      const chunkPathOfFile = path.resolve(UPLOAD_DIR, fileHash);
      // 这里如果直接检测文件路径的话，可能因为没有这个路径而报错，所以先检测路径是否存在
      const hadUploadedChunksList = (await fse.existsSync(chunkPathOfFile))
        ? await fse.readdir(chunkPathOfFile)
        : [];
      console.log('hadUploadedChunksList:>>', hadUploadedChunksList);
      if (fse.existsSync(willCheckPath)) {
        res.end(
          JSON.stringify({
            code: 2,
            message: 'existed',
            hadUploadedChunksList,
          })
        );
      } else if (fse.existsSync(chunkPathOfFile)) {
        res.end(
          JSON.stringify({
            code: 1,
            message: 'not all existed',
            hadUploadedChunksList,
          })
        );
      } else {
        res.end(
          JSON.stringify({
            code: 0,
            message: 'no exist',
            hadUploadedChunksList,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 功能：合并
   * - 1. handlePostData 用来处理 POST 传递的数据，具体怎么处理的请查看方法
   * - 2. 把各个文件的 path 先想清楚要存到哪儿，建议自己写一写。
   * - 我是把所有的 chunks 都放到大目录 chunkPath 中，
   * - 然后在用文件名新建文件夹，再把chunks放到子文件夹中。
   * - 后来改成 hash 为文件夹名
   * @param {*} req
   * @param {*} res
   */
  async handleMerge(req, res, MERGE_DIR) {
    const postData = await handlePostData(req);
    const { fileName, size: eachChunkSize, fileHash } = postData;
    const ext = path.extname(fileName);
    const mergeFilePath = `${MERGE_DIR}/${fileHash}${ext}`;
    if (!fse.existsSync(MERGE_DIR)) {
      fse.mkdirSync(MERGE_DIR);
    }
    const mergeOptions = { chunksPath: this.chunksPath, mergeFilePath, fileName, eachChunkSize, fileHash };
    await handleMergeChunks(mergeOptions);
    // handleMergeChunks 函数返回的是Promise(), 值为 undefined
    console.log('Success Merge');
    res.end(
      JSON.stringify({
        code: 1,
        message: 'success merge',
      })
    );
  }

  /**
   * multiparty 使用方法：https://www.npmjs.com/package/multiparty
   * - chunkFileDirPath 为关于文件 chunks 的文件夹路径，每个大文件根据文件名生成相关的文件夹
   * - 注意回调函数里的 this
   * @param {*} url
   * @param {*} path
   */
  async handleUpload(req, res) {
    const _this = this;
    const form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        console.log(err);
        return;
      }
      const [chunk] = files.chunk;
      const [fileHash] = fields.fileHash;
      const [index] = fields.index;

      const chunkFileDirPath = `${_this.chunksPath}/${fileHash}`;
      if (!fse.existsSync(chunkFileDirPath)) {
        await fse.mkdirs(chunkFileDirPath);
      }
      await fse.move(chunk?.path, `${chunkFileDirPath}/${fileHash}_${index}`);
      res.end('收到文件 chunks');
    });
  }
}
module.exports = Controller;
