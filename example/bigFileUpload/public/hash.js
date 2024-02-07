importScripts('./spark-md5.min.js');

/**
 * 功能：blob 转换成 ArrayBuffer
 * @param {*} blob
 * @returns
 */
async function handleBlob2ArrayBuffer(blob) {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(blob);
    fileReader.onload = function (e) {
      resolve(e.target.result);
    };
  });
}

/**
 * 功能：求整个文件的 Hash
 * - self.SparkMD5 和 SparkMD5 都一样
 * - 1. FileReader.onload	处理 load 事件。该事件在读取操作完成时触发。
 * - 流程图展示
 * ┌────┐                                   ┌───────────┐                                     ┌────┐
 * │    │   Object      fileReader          │           │      new SparkMD5.ArrayBuffer()     │    │
 * │Blob│ ────────────────────────────────► │ArrayBuffer│ ───────────────┬──────────────────► │Hash│
 * │    │   Method   readAsArrayBuffer      │           │       append() └────►  end()        │    │
 * └────┘                                   └───────────┘                                     └────┘
 */
self.onmessage = async (e) => {
  const { data } = e;
  const spark = new SparkMD5.ArrayBuffer();
  let percentage = 0;
  for (let i = 0, len = data.length; i < len; i++) {
    const eachArrayBuffer = await handleBlob2ArrayBuffer(data[i].file);
    percentage += 100 / len;
    self.postMessage({
      percentage,
    });
    spark.append(eachArrayBuffer);
  }
  const hash = spark.end();
  self.postMessage({
    percentage: 100,
    hash,
  });
  self.close();
};
