'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6
1
2
1
2
1
2`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(solution());

function solution() {
  const N = Number(input());
  const card = [];

  for (let i = 0; i < N; i++) {
    card.push(input());
  }

  const sortedArr = mergeSort(card.map(BigInt));
  let maxCount = 0;
  let curCount = 0;
  let prevNumber = '';
  let largest = 2 ** 62;

  sortedArr.forEach((v) => {
    if (prevNumber !== v) {
      prevNumber = v;
      curCount = 0;
    }

    curCount++;

    if (curCount > maxCount || (curCount === maxCount && largest > v)) {
      maxCount = curCount;
      largest = v;
    }
  });

  return String(largest);
}

function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr) {
  const sortedArr = [];

  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    if (leftArr[leftIdx] < rightArr[rightIdx]) {
      sortedArr.push(leftArr[leftIdx]);
      leftIdx++;
    } else {
      sortedArr.push(rightArr[rightIdx]);
      rightIdx++;
    }
  }

  return sortedArr.concat(leftArr.slice(leftIdx), rightArr.slice(rightIdx));
}
