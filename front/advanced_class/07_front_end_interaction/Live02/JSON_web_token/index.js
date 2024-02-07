const Koa = require('koa');
const Static = require('koa-static');
const Router = require('koa-router');
const koaBody = require('koa-body');

const jwt = require('jsonwebtoken'); // 签发token
const koajwt = require('koa-jwt'); // 鉴权

const mysql2 = require('mysql2');
let app = new Koa();
app.use(Static(__dirname + '/static'));
app.use(koaBody());
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'js04',
});
let router = new Router();
router.get('/', (ctx) => {
  ctx.body = 'proxy代理服务器...';
});
router.post('/checkUser', async (ctx) => {
  let { username, pwd } = ctx.request.body;
  console.log(username, pwd);
  let [rows] = await connection
    .promise()
    .query('SELECT * FROM users WHERE username=? AND pwd=?', [username, pwd]);
  // console.log(rows);
  let resData;
  if (rows.length > 0) {
    // 用户名且密码正确；
    // 签发token；

    let token = jwt.sign(
      {
        name: 'some value',
      },
      'mytoken',
      { expiresIn: '2h' } // 时效性，一般都是 2 个小时
    );
    resData = {
      info: '用户名密码正确',
      status: 1,
      token,
    };
  } else {
    resData = {
      info: '用户名或者密码错误',
      status: 0,
    };
  }
  ctx.body = resData;
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic29tZSB2YWx1ZSIsImlhdCI6MTU3Mjk2NDQ3MiwiZXhwIjoxNTcyOTcxNjcyfQ.g4gimJZmW1UHvecdu4A7IA4wtGHSVpu5TcW2ab5UYq8"
});

// 这边会自动鉴权
router.get('/checkApi', koajwt({ secret: 'mytoken' }), (ctx) => {
  ctx.body = {
    test: 'value..',
  };
});

app.use(router.routes());
app.listen(3000);
