const http = require('http');
const server = http.createServer();
const url = require('url');
const fs = require('fs');
const path = require('path');
const MIME = require('./MIME.json');

const PUBLIC_DIR = path.resolve('../public');
const UPLOAD_DIR = path.resolve('../chunkPath'); // chunks 上传的文件夹
const MERGE_DIR = path.resolve('../merge');

const Controller = require('./controller');
const controller = new Controller(UPLOAD_DIR);

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('content-type', 'text/html;charset=utf-8');
  if (req.method === 'OPTION') {
    res.status = 200;
    res.end();
    return;
  }
  let { pathname } = url.parse(req.url); // 解析一下 url，因为 req.url 可能会带一些参数
  // console.log('req.url:>>', req.url); console.log('url.parse(req.url):>>', url.parse(req.url));
  console.log(`进入${pathname}`);
  switch (pathname) {
    case '/':
    case '/index': {
      let rs = fs.createReadStream(`${PUBLIC_DIR}/index.html`);
      rs.pipe(res);
      break;
    }
    case '/verify': {
      await controller.handleVerify(req, res, MERGE_DIR, UPLOAD_DIR);
      break;
    }
    case '/upload': {
      await controller.handleUpload(req, res);
      break;
    }
    case '/merge': {
      await controller.handleMerge(req, res, MERGE_DIR);
      break;
    }
    case '/favicon.ico': {
      res.end('我没有哦');
      break;
    }
    default: {
      let ext = path.extname(pathname);
      res.setHeader('Content-Type', MIME[ext]); // 通过请求的资源后缀名，来返回对应的 Content-type 的类型
      let rs = fs.createReadStream(`${PUBLIC_DIR}/${pathname}`);
      rs.pipe(res);
    }
  }
});
const POST = 3000;
server.listen(POST, null, null, () => {
  console.log(`server start: http://localhost:${POST}`);
});
