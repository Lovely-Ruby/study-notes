/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 轮转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const newNums = [...nums];
  let left = 0,
    length = nums.length - 1;
  while (left < length) {
    nums[(k + left) % len] = newNums[left];
    left++;
  }
};
// @lc code=end
