/*
 * @lc app=leetcode.cn id=414 lang=javascript
 *
 * [414] 第三大的数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  // 维护三个数，分别是最大值a,次大值b,第三大值c
  let [a, b, c] = new Array(3).fill(-Number.MAX_SAFE_INTEGER);
  // 模拟调换顺序
  // 比方说现在的情况是 [5,4,3]
  // 当 i = 6 时，三个数都需要更新
  // 当 i = 4.5 时，只有 b 和 c 需要更新
  // 当 i = 3.5 时 只有 c 需要更新
  nums.forEach((i) => {
    if (i > a) {
      c = b;
      b = a;
      a = i;
    } else if (i > b && i < a) {
      c = b;
      b = i;
    } else if (i > c && i < b) {
      c = i;
    }
  });

  return c === -Number.MAX_SAFE_INTEGER ? a : c;
};
// @lc code=end

// var thirdMax = function (nums) {
//   //排序加去重
//   nums.sort((a, b) => b - a);
//   const setnum = [...new Set(nums)];
//   if (setnum.length >= 3) {
//     return setnum[2];
//   } else {
//     return setnum[0];
//   }
// };
