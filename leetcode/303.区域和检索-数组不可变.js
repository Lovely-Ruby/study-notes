/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
/**
 * @param {number[]} nums
 */

// 前缀和
/**
 * 普通暴力的问题是，重复调用 sumRange 的时候，时间复杂度都是 nums.length，不好
 * 在实例化对象的时候就用前缀和给计算出来就好了
 * num[i] = preSum[i + 1] - preSum[i]
 * num[i + 1] = preSum[i + 2] - preSum[i + 1]
 *
 * ......    ......
 * num[j] = preSum[j + 1] - preSum [j]
 *
 * num[i] + num[i+1] + ... + num[j] = preSum[j + 1] - preSum[i]
 *
 * 为什么要修改 preSum 的定义
 * - 因为 num[i] = sum[i] - sum[i-1] 当i=0 时数组越界，不方便
 *
 * 怎么定义新的 preSum
 * preSum[0] = 0; 0 不会影响加和
 * 为了保证  num[i] = sum[i] - sum[i-1] 不变
 * 那么原来的 sum[i] 等于 sum[i+1]
 * 原来的sum[i-1] = sum[i] 即可
 */
// 如何设计一个类
var NumArray = function (nums) {
  // preSum[i] = nums[0] + nums[1] + ... + nums[i]
  const preSum = [0]
  for (let i = 0; i < nums.length; i++) {
    preSum[i + 1] = nums[i] + preSum[i]
  }
  this.nums = nums
  this.preSum = preSum
}

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  return this.preSum[right + 1] - this.preSum[left]
}

// const numArray = new NumArray([-2, 0, 3, -5, 2, -1])
// console.log(numArray.sumRange(0, 2))
// console.log(numArray.sumRange(2, 5))
/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end
