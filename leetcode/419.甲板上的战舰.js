/*
 * @lc app=leetcode.cn id=419 lang=javascript
 *
 * [419] 甲板上的战舰
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {number}
 */
var countBattleships = function (board) {
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "X") {
        if (
          board?.[i - 1]?.[j] === "XX" ||
          board?.[i + 1]?.[j] === "XX" ||
          board?.[i]?.[j - 1] === "XX" ||
          board?.[i]?.[j + 1] === "XX"
        ) {
          // 说明是连在一起的
        } else {
          count++;
        }
        board[i][j] = "XX";
      }
    }
  }
  return count;
};
console.log(
  countBattleships([
    ["X", ".", ".", "X"],
    [".", ".", ".", "X"],
    [".", ".", ".", "X"],
  ])
);
// @lc code=end
