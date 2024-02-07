const Koa = require('koa');
const Static = require('koa-static');
const Router = require('koa-router');
const koaBody = require('koa-body');

const jwt = require('jsonwebtoken'); // 签发token
const koajwt = require('koa-jwt'); // 鉴权
const axios = require('axios');
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

router.post('/checkUser', async (ctx) => {
  const { password, username } = ctx.request.body;
  let res = await axios.post('http://localhost:4000/checkUser', {
    password,
    username,
  });
  // console.log(res.data)
  ctx.body = res.data;
});

app.use(router.routes());
app.listen(3000, () => {
  console.log('listen 3000 port');
});
