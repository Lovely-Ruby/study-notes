# 我写的问题

函数如果是 promise 一定要记得写返回 return！！！

```javascript
return new Promise();
```

# fs 常用操作

- 检测文件/ 文件夹是否存在：`fs.existsSync()`
- 读文件夹下的单层文件：`fse.readdir`

# 知识点

- [fs 模块中的 unlinkSync](https://www.cainiaojc.com/nodejs/delete-a-file-in-nodejs-using-node-fs.html)

# 备用代码

## 上传

```javascript
chunkPaths.forEach((chunk, index) => {
  const eachChunkPath = `${chunkDir}/${chunk}`;
  const writeStream = fse.createWriteStream(mergePath, {
    start: index * eachChunkSize,
  });
  pipeStream(eachChunkPath, writeStream, allChunkCount);
});
```

## 处理流数据

```javascript
const hasMergeChunk = {};
function pipeStream(path, writeStream, allChunkCount) {
  const readStream = fse.createReadStream(path);
  readStream.pipe(writeStream);
  readStream.on('end', () => {
    hasMergeChunk[path] = 'finish';
    if (Object.keys(hasMergeChunk).length === allChunkCount) {
      console.log(`合并完成，共 ${Object.keys(hasMergeChunk).length} 块`);
    }
  });
}
```

## 利用工作者线程计算 hash

```javascript
/**
 * 功能：计算整体文件 Hash
 */
function handleCalculateHash(fileChunkList) {
  return new Promise((resolve) => {
    let worker = new Worker('./hash.js');
    worker.postMessage(fileChunkList);
    worker.onmessage = function (e) {
      const { percentage } = e.data;
      document.querySelector('#hashProgress').value = percentage;
      document.querySelector('#hashProgressSpan').innerHTML = `${percentage.toFixed(2)} %`;
      if (percentage === 100) {
        resolve(e?.data?.hash);
      }
    };
    worker.onerror = function (e) {
      console.log(e);
    };
  });
}
```
