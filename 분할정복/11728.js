'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `2 2
3 5
2 9`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

// 배열 메소드를 활용한 구현
function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const A = input().split(' ').map(Number);
  const B = input().split(' ').map(Number);

  const result = [].concat(A, B).sort((a, b) => a - b);

  return result.join(' ');
}

// 병합정렬 알고리즘으로 분할정복법으로 구현
// 결과값은 동일 백준에서는 메모리 초과 발생
// function Solution() {
//   const [N, M] = input().split(' ').map(Number);
//   const A = input().split(' ').map(Number);
//   const B = input().split(' ').map(Number);

//   const mergeSort = (arr) => {
//     if (arr.length < 2) return arr;

//     const mid = Math.floor(arr.length / 2);

//     const leftArr = arr.slice(0, mid);
//     const rightArr = arr.slice(mid);

//     return merge(mergeSort(leftArr), mergeSort(rightArr));
//   };

//   const merge = (leftArr, rightArr) => {
//     const sortArr = [];

//     let leftIdx = 0;
//     let rightIdx = 0;

//     while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
//       if (leftArr[leftIdx] < rightArr[rightIdx]) {
//         sortArr.push(leftArr[leftIdx]);
//         leftIdx++;
//       } else {
//         sortArr.push(rightArr[rightIdx]);
//         rightIdx++;
//       }
//     }

//     return sortArr.concat(leftArr.slice(leftIdx), rightArr.slice(rightIdx));
//   };

//   const result = mergeSort(A.concat(B)).join(' ');

//   return result;
// }
