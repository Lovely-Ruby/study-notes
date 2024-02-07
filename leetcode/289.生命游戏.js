/*
 * @lc app=leetcode.cn id=289 lang=javascript
 *
 * [289] 生命游戏
 */

// @lc code=start
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

var gameOfLife = function (board) {
  const record = new Array(board.length)
    .fill(0)
    .map(() => new Array(board[0].length).fill(0));
  const calculatorNear = (i, j) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let liveCells = 0;
    for (let k = 0; k < directions.length; k++) {
      const [currX, currY] = directions[k];
      const currI = i + currX;
      const currJ = j + currY;
      if (
        currI < 0 ||
        currJ < 0 ||
        currI > board.length - 1 ||
        currJ > board[0].length - 1
      ) {
        // 如果出了边界
        continue;
      } else {
        if (board[currI][currJ] === 1) {
          // 记录活细胞个数
          liveCells++;
        }
      }
    }
    return liveCells;
  };
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const calLiveCell = calculatorNear(i, j);
      record[i][j] = calLiveCell;
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      // 写规则
      const currLive = record[i][j];
      if (currLive < 2) {
        board[i][j] = 0;
      } else if ((currLive === 2 || currLive === 3) && board[i][j] === 1) {
        board[i][j] = 1;
      } else if (currLive === 3) {
        board[i][j] = 1;
      } else if (currLive > 3) {
        board[i][j] = 0;
      }
    }
  }
  return board;
};
// @lc code=end
// console.log(
//   gameOfLife([
//     [1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 1],
//     [1, 0, 0, 0, 1],
//     [1, 0, 0, 0, 1],
//     [1, 1, 1, 1, 1],
//   ])
// );
