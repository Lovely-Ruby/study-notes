/*
 * @lc app=leetcode.cn id=697 lang=javascript
 *
 * [697] 数组的度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
  // 建立映射表，其中的值为 [数字出现的频率，数字第一次出现的下标，数字最后出现的下标]
  const m = {};
  for (let [index, item] of nums.entries()) {
    if (m[item]) {
      m[item][0]++;
      m[item][2] = index;
    } else {
      m[item] = [1, index, index];
    }
  }
  let maxCount = 0,
    minLen = 0;
  // 线性遍历映射表，更新最大值以及其最小长度，这一次遍历能或得到最大值
  for (let [count, startIndex, endIndex] of Object.values(m)) {
    if (maxCount < count) {
      maxCount = count;
      minLen = endIndex - startIndex + 1;
    } else if (maxCount === count) {
      // 如果最大值相等，那么比较长度
      const len = endIndex - startIndex + 1;
      if (minLen > len) {
        // 更新最短长度
        minLen = len;
      }
    }
  }
  return minLen;
};
// @lc code=end
