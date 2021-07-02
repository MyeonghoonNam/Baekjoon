'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
1 2 3`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  let A = input().split(' ').map(Number);
  let result = 0;

  const mergeSort = (arr) => {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);

    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
  };

  const merge = (leftArr, rightArr) => {
    const sortArr = [];

    let leftIdx = 0;
    let rightIdx = 0;

    while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
      if (leftArr[leftIdx] < rightArr[rightIdx]) {
        sortArr.push(leftArr[leftIdx]);
        leftIdx++;
      } else {
        sortArr.push(rightArr[rightIdx]);
        rightIdx++;
        result += leftArr.length - leftIdx;
      }
    }

    return sortArr.concat(leftArr.slice(leftIdx), rightArr.slice(rightIdx));
  };

  mergeSort(A);

  return result;
}
