/*
 * @lc app=leetcode.cn id=453 lang=javascript
 *
 * [453] 最小操作次数使数组元素相等
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function (nums) {
  const min = Math.min(...nums);
  let count = 0;
  for (let i of nums) {
    count += i - min;
  }
  return count;
};
// @lc code=end
