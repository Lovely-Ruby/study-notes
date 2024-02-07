/*
 * @lc app=leetcode.cn id=598 lang=javascript
 *
 * [598] 范围求和 II
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function (m, n, ops) {
  if (ops.length === 0) {
    return m * n;
  }
  let minM = Number.MAX_SAFE_INTEGER,
    minN = Number.MAX_SAFE_INTEGER;
  for (let op of ops) {
    let [currM, currN] = op;
    minM = Math.min(currM, minM);
    minN = Math.min(currN, minN);
  }
  return minM * minN;
};
console.log(maxCount(40000, 40000, []));
// @lc code=end
