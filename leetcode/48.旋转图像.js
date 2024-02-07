/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  // 首先观察最后的结果能不能 通过简单的变化 改成有规律的样子
  /**
            对角线互换            翻转
    +-----+           +-----+           +-----+
    |7 4 1|           |7 8 9|           |1 2 3|
    |     |           |     |           |     |
    |8 5 2|  +----->  |4 5 6|  +----->  |4 5 6|
    |     |           |     |           |     |
    |9 6 3|           |1 2 3|           |7 8 9|
    +-----+           +-----+           +-----+
  */
  matrix.reverse();
  const r = matrix.length;
  for (let i = 0; i < r - 1; i++) {
    for (let j = i; j < r; j++) {
      if (i === j) continue;
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  return matrix;
};

// @lc code=end
