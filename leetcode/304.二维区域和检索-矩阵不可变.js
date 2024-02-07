/*
 * @lc app=leetcode.cn id=304 lang=javascript
 *
 * [304] 二维区域和检索 - 矩阵不可变
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function (matrix) {
  const pSum = new Array(matrix.length + 1)
    .fill(0)
    .map((i) => new Array(matrix[0].length + 1).fill(0))
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      pSum[i + 1][j + 1] =
        matrix[i][j] - pSum[i][j] + pSum[i][j + 1] + pSum[i + 1][j]
    }
  }
  this.pSum = pSum
}

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  const { pSum } = this
  //   console.log(pSum)
  return (
    pSum[row2 + 1][col2 + 1] +
    pSum[row1][col1] -
    pSum[row2 + 1][col1] -
    pSum[row1][col2 + 1]
  )
}
// const a = new NumMatrix([
//   [3, 0, 1, 4, 2],
//   [5, 6, 3, 2, 1],
//   [1, 2, 0, 1, 5],
//   [4, 1, 0, 1, 7],
//   [1, 0, 3, 0, 5],
// ])
// console.log(a.sumRegion(2, 1, 4, 3))
// console.log(a.sumRegion(1, 1, 2, 2))
// console.log(a.sumRegion(1, 2, 2, 4))

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end
