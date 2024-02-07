/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let top = 0,
    bottom = n - 1,
    left = 0,
    right = n - 1;
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let step = 1;
  while (left < right && top < bottom) {
    for (let i = left; i < right; i++) res[top][i] = step++;
    for (let i = top; i < bottom; i++) res[i][right] = step++;
    for (let i = right; i > left; i--) res[bottom][i] = step++;
    for (let i = bottom; i > top; i--) res[i][left] = step++;
    top++;
    left++;
    bottom--;
    right--;
  }
  if (bottom === top) {
    for (let i = left; i <= right; i++) res[top][i] = step++;
  } else if (left === right) {
    for (let i = bottom; i >= top; i--) res[i][left] = step++;
  }
  return res;
};
// @lc code=end
