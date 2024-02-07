/*
 * @lc app=leetcode.cn id=628 lang=javascript
 *
 * [628] 三个数的最大乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
  // 这题考题目的理解啊
  // 三个数中，可能最大的情况是，三个正数，以及两个最小的负数乘上一个最大的正数
  nums.sort((a, b) => {
    return a - b;
  });
  const L1 = nums[0];
  const L2 = nums[1];
  const R1 = nums[nums.length - 1];
  const R2 = nums[nums.length - 2];
  const R3 = nums[nums.length - 3];

  return Math.max(L1 * L2 * R1, R1 * R2 * R3);
};
// @lc code=end
