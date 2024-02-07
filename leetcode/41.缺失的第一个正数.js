/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  // 本质是哈希,只不过是借用了原先的数组
  // 首先把所有的负数, 0 都变成大于 N+1 的数
  // 我们将 【1,n】出现的数字 在数组的index上做标记
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] <= 0) {
      nums[i] = len + 1;
    }
  }
  for (let i = 0; i < len; i++) {
    const n = Math.abs(nums[i]);
    if (n >= 1 && n <= len) {
      nums[n - 1] = -Math.abs(nums[n - 1]);
    }
  }
  console.log(nums);
  for (let i = 0; i < len; i++) {
    if (nums[i] >= 0) {
      return i + 1;
    }
  }
  return len + 1;
};
// @lc code=end

const r = firstMissingPositive([1, 2, 0]);
console.log(r);
