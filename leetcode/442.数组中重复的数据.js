/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  let i = 0;
  // 这题跟448一样，将数字放到相应的位置，空间为1
  while (i < nums.length) {
    // if (nums[i] === i - 1) {
    //   i++;
    //   continue;
    // }
    const idealIdx = nums[i] - 1;
    if (nums[i] === nums[idealIdx]) {
      i++;
      continue;
    }
    [nums[idealIdx], nums[i]] = [nums[i], nums[idealIdx]];
  }
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      res.push(nums[i]);
    }
  }
  return res;
};
// @lc code=end
