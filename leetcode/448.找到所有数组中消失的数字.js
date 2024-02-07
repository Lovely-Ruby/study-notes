/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  // 找出缺失的数字
  // 把所有的数放到理应的位置,然后一次遍历，如果当前位置和下标对应不上，那么就是缺失的
  let i = 0;
  while (i < nums.length) {
    // 当前的数已经到了理应的位置
    // if (nums[i] === i + 1) {
    //   i++;
    //   continue;
    // }
    //
    const idealIdx = nums[i] - 1;
    // 如果当前数字理应出现的位置上已经出现当前数字，那么不用换
    // 这一步就是在晒哪些数字不存在
    if (nums[idealIdx] === nums[i]) {
      i++;
      continue;
    }
    [nums[idealIdx], nums[i]] = [nums[i], nums[idealIdx]];
  }
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      res.push(i + 1);
    }
  }
  return res;
};

// var findDisappearedNumbers = function (nums) {
//   const a = Array(nums.length + 1).fill(0);
//   nums.forEach((i) => {
//     a[i]++;
//   });
//   const res = [];
//   for (let i = 1; i < a.length; i++) {
//     if (a[i] === 0) {
//       res.push(i);
//     }
//   }
//   return res;
// };

// const res = findDisappearedNumbers([4,3,2,7,8,2,3,1])
// console.log(res);
// @lc code=end
