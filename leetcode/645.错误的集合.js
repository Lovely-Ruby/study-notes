/*
 * @lc app=leetcode.cn id=645 lang=javascript
 *
 * [645] 错误的集合
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  let resArr = new Array(nums.length + 1).fill(0);
  nums.forEach((i) => resArr[i]++);
  let res = [0, 0];
  for (let i = 1; i < resArr.length; i++) {
    const item = resArr[i];
    if (item === 0) {
        res[1] = i;
    }
    if (item === 2) {
        res[0] = i;
    }
  }
  return res;
};
// @lc code=end
