const http = require('http');
const URL = require('url');
const fs = require('fs'); // file system

// 媒体类型（也通常称为多用途互联网邮件扩展或 MIME 类型）是一种标准，用来表示文档、文件或一组数据的性质和格式。它在 IETF 的 RFC 6838 中进行了定义和标准化。
const MIME = require('./MIME.json');
const path = require('path');

// 查看目录
fs.readdir('./view', 'utf-8', function (err, data) {
  console.log(data);
});

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'text/html;charset=utf-8');
  let parseURL = URL.parse(request.url);
  console.log(parseURL.pathname);

  switch (parseURL.pathname) {
    case '/index': {
      //   let htmlData = fs.readFileSync('./view/index.html');
      //   response.end(htmlData);
      let htmlData = fs.createReadStream('./view/index.html');
      htmlData.pipe(response);
      break;
    }
    case '/user': {
      response.end('用户');
      break;
    }
    case '/favicon.ico': {
      break;
    }
    default: {
      // 其他资源走这里
      let rs = fs.createReadStream('./view' + parseURL.pathname);
      let ext = path.extname(parseURL.pathname);
      response.setHeader('content-type', MIME[ext]);
      rs.pipe(response);
    }
  }
});

const post = 3000;
server.listen(post, null, null, () => {
  console.log(`server start!!!: http://localhost:${post}`);
});
