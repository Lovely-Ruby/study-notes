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

// 后端的话可以通过 app.use 统一配置 ctx 的头部，但是我不会。

// 这坨代码要注意放的位置
// app.use((ctx, next) => {
//     // 听说这里可以做跨域的处理
//     console.log('上面的:>>')
//     ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
//     ctx.set(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, withCredentials',
//     )
//     ctx.body = {}
//     next() // 这里不加next 是不会走到下面的中间件的
// })
router.all('/fetchtest', (ctx) => {
  console.log(ctx.request.body);
  ctx.body = {
    info: 'hello fetch',
  };
});
router.options('/checkUser', (ctx) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // 跨域是 option 和正式请求都需要设置的
  ctx.set(
    // 而设置头部，只需要 options 通过即可
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, withCredentials'
  );
  ctx.body = {};
});
router.options('/checkApi', (ctx) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  );
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.body = {};
});

router.post('/checkUser', async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  // ctx.set(
  //     'Access-Control-Allow-Headers',
  //     'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, withCredentials',
  // )
  let { username, password } = ctx.request.body;
  // console.log(username, password)
  let [rows] = await connection
    .promise()
    .query('SELECT * FROM users WHERE username=? AND password=?', [
      username,
      password,
    ]);
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
router.post('/checkApi', koajwt({ secret: 'mytoken' }), (ctx) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Accept, X-Requested-With'
  );
  // ctx.set('Access-Control-Allow-Credentials', true)
  ctx.body = {
    test: '認證成功..',
  };
});

// app.use((ctx) => {
//     // 听说这里可以做跨域的处理
//     console.log('下面的')
// })

app.use(router.routes());

const port = 4000;
app.listen(port, () => {
  console.log(`listen ${port} port.`);
});
