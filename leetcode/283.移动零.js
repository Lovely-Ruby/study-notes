/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var moveZeroes = function (nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }
  return nums;
};
// // 快慢指针
// var moveZeroes = function (nums) {
//   let slow = 0; // 慢指针总是指着 0
//   let fast = 0; // 快指针去找非零的数字
//   if (nums.length === 1) {
//     return nums;
//   }
//   while (fast < nums.length) {
//     while (nums[slow] !== 0 && slow < nums.length) {
//       slow++;
//     }
//     fast = slow;
//     while (nums[fast] === 0 && fast < nums.length) {
//       fast++;
//     }
//     if (fast < nums.length && slow < nums.length)
//       [nums[fast], nums[slow]] = [nums[slow], nums[fast]];
//     fast++;
//     slow++;
//   }
//   return nums;
// };
const r = moveZeroes([2, 2, 4, 0, 0, 1, 0, 0]);
console.log(r);
// @lc code=end
