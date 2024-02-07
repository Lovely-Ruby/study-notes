/*
 * @lc app=leetcode.cn id=73 lang=javascript
 *
 * [73] 矩阵置零
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const row = matrix.length;
  const column = matrix[0].length;
  let rN = {};
  let cN = {};
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (matrix[i][j] === 0) {
        rN[i] = true;
        cN[j] = true;
      }
    }
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (rN[i] || cN[j]) {
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
};
console.log(
  setZeroes([
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ])
);
// @lc code=end
