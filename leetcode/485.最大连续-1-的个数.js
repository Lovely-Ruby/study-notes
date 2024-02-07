/*
 * @lc app=leetcode.cn id=485 lang=javascript
 *
 * [485] 最大连续 1 的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  // 一次遍历
  let max = 0;
  let curr = 0;
  nums.forEach((item) => {
    if (item === 1) {
      curr++;
    } else {
      max = Math.max(max, curr);
      curr = 0;
    }
  });
  // 可能最后一位也是1，所以循环完结束也需要判断一下
  if (max < curr) {
    max = curr;
  }
  return max;
};
// @lc code=end

// 第二个解题版本
// var findMaxConsecutiveOnes = function (nums) {
//   return Math.max(
//     ...nums
//       .join('')
//       .split('0')
//       .map((i) => i.length)
//   );
// };
