/*
 * @lc app=leetcode.cn id=1710 lang=javascript
 *
 * [1710] 卡车上的最大单元数
 */

// @lc code=start
/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  boxTypes.sort((a, b) => b[1] - a[1]);
  let sum = 0;
  let currentTruckSize = truckSize;
  let i = 0;
  while (currentTruckSize > 0 && i < boxTypes.length) {
    const x = boxTypes[i];
    if (x[0] < currentTruckSize) {
      sum += x[0] * x[1];
      currentTruckSize = currentTruckSize - x[0];
    } else {
      sum += currentTruckSize * x[1];
      break;
    }
    i++;
  }
  return sum;
};
// console.log(
//   maximumUnits(
//     [
//       [1, 3],
//       [2, 2],
//       [3, 1],
//     ],
//     4
//   )
// );
// @lc code=end
