/*
 * @lc app=leetcode.cn id=520 lang=javascript
 *
 * [520] 检测大写字母
 */
// @lc code=start

/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  const reg1 = new RegExp(/^[A-Z]+$/),
    reg2 = new RegExp(/^[a-z]+$/),
    reg3 = new RegExp(/^[A-Z][a-z]+$/);
  return reg1.test(word) || reg2.test(word) || reg3.test(word);
};
// @lc code=end
