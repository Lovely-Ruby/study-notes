/*
 * @lc app=leetcode.cn id=661 lang=javascript
 *
 * [661] 图片平滑器
 */

// @lc code=start
/**
 * @param {number[][]} img
 * @return {number[][]}
 */

//  var imageSmoother = function(img) {
//     const m = img.length, n = img[0].length;
//     const ret = new Array(m).fill(0).map(() => new Array(n).fill(0));
//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             let num = 0, sum = 0;
//             for (let x = i - 1; x <= i + 1; x++) {
//                 for (let y = j - 1; y <= j + 1; y++) {
//                     if (x >= 0 && x < m && y >= 0 && y < n) {
//                         num++;
//                         sum += img[x][y];
//                     }
//                 }
//             }
//             ret[i][j] = Math.floor(sum / num);
//         }
//     }
//     return ret;
// };

var imageSmoother = function (img) {
  // 还是?.好用
  var calculator = (currI, currJ) => {
    let count = 9;
    let add = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const curr = img?.[currI + i]?.[currJ + j];
        if (curr === undefined) {
          count--;
        } else {
          add += curr;
        }
      }
    }
    return { add, count };
  };
  let img1 = new Array();
  for (let i = 0; i < img.length; i++) {
    // 每一行
    let row = new Array(img[0].length).fill(0);
    for (let j = 0; j < img[0].length; j++) {
      const { add, count } = calculator(i, j);
      row[j] = Math.floor(add / count);
    }
    img1.push(row);
  }
  return img1;
};
console.log(
  imageSmoother([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ])
);
// @lc code=end
