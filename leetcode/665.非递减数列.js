/*
 * @lc app=leetcode.cn id=665 lang=javascript
 *
 * [665] 非递减数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function (nums) {
  //   console.log(nums);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) {
      return false;
    }
  }
  return true;
};

var checkPossibility = function (nums) {
  /**
   * 两种情况
   * [4, 2, 3]
   * [5, 6, 1, 7]
   */
  if (nums.length === 1) return true;
  const n1 = [...nums];
  const n2 = [...nums];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) {
      n1.splice(i, 1);
      n2.splice(i + 1, 1);
      return check(n1) || check(n2);
    }
  }
  return true;
};
// @lc code=end
