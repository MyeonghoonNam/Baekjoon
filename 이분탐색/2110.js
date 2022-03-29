"use strict";

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3
1
2
8
4
9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const binarySearch = (arr, count, length) => {
  let start = 1;
  let end = arr[length - 1] - arr[0];
  let result = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let value = arr[0];
    let currentCount = 1;

    for (let i = 1; i < length; i++) {
      if (arr[i] >= value + mid) {
        value = arr[i];
        currentCount++;
      }
    }

    if (currentCount >= count) {
      start = mid + 1;
      result = mid;
    } else {
      end = mid - 1;
    }
  }

  return result;
};

const solution = () => {
  const [N, C] = input().split(" ").map(Number);
  const home = [];

  for (let i = 0; i < N; i++) {
    home.push(Number(input()));
  }

  home.sort((a, b) => a - b);

  const reuslt = binarySearch(home, C, N);
  return reuslt;
};

console.log(solution());
