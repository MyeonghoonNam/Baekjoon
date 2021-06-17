'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5
4 1 5 2 3
5
1 3 7 9 5`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  let arr = input().split(' ').map(Number);

  const M = Number(input());
  const number = input().split(' ').map(Number);

  const result = [];

  // 퀵 정렬으로도 가능
  const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) return arr;

    const mid = parseInt((left + right) / 2);
    const pivot = arr[mid];
    const partition = devide(arr, left, right, pivot);

    quickSort(arr, left, partition - 1);
    quickSort(arr, partition, right);

    return arr;
  };

  const devide = (arr, left, right, pivot) => {
    while (left <= right) {
      while (arr[left] < pivot) left++;
      while (arr[right] > pivot) right--;

      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }

    return left;
  };

  const binarySearch = (arr, data) => {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      let mid = parseInt((low + high) / 2);

      if (arr[mid] < data) low = mid + 1;
      else if (arr[mid] > data) high = mid - 1;
      else return 1;
    }

    return 0;
  };

  arr = quickSort(arr);
  // arr.sort((a, b) => a - b);

  for (let i = 0; i < M; i++) {
    result.push(binarySearch(arr, number[i]));
  }

  return result.join('\n');
}
