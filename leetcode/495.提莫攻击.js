/*
 * @lc app=leetcode.cn id=495 lang=javascript
 *
 * [495] 提莫攻击
 */

// @lc code=start
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  if (timeSeries.length === 1) {
    return duration;
  }
  let poisoning = 0;
  // 判断当前时间和上一个事件点的差值，是否能吃满毒
  for (let i = 1; i < timeSeries.length; i++) {
    const curr = timeSeries[i];
    const before = timeSeries[i - 1];
    if (curr - before + 1 > duration) {
      // 如果攻击的间隔小于中毒的持续时长，那么中毒的持续时间就是
      poisoning += duration;
    } else {
      poisoning += curr - before;
    }
  }
  return poisoning + duration;
};
// @lc code=end
