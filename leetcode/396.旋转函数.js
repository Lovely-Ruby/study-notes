/*
 * @lc app=leetcode.cn id=396 lang=javascript
 *
 * [396] 旋转函数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxRotateFunction = function (nums) {
  // 归纳递推公式，不能直接暴力
  // fk = f(k-1) + numsSum - n * nums[n-1];
  let f0 = 0;
  let numsSum = nums.reduce((c, p) => c + p, 0);
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    f0 += i * nums[i];
  }
  let max = f0;
  let fCurr = f0;
  for (let i = 1; i < len; i++) {
    fNext = fCurr + numsSum - len * nums[len - i];
    max = Math.max(fNext, max);
    fCurr = fNext;
  }
  return max;
  // 根据公式地铁
};
console.log(maxRotateFunction([4, 3, 2, 6])); // @lc code=end
