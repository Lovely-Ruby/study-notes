var splitListToParts = function (arr, k) {
  //   const arr = [];
  //   while (head) {
  //     arr.push(head.val);
  //     head = head.next;
  //   }
  const len = arr.length;
  const countArr = new Array(k).fill(0);
  // JSON.parse(JSON.stringify(countArr))
  // console.log(arr)
  let index = 0;
  while (index < len) {
    countArr[index % k]++;
    index++;
  }
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(arr.splice(0, countArr[i]));
  }
  return result;
};
console.log(splitListToParts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
console.log(splitListToParts([1, 2, 3], 5));
// const res = console.log(res);
