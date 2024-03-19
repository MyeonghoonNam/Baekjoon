const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
5 3
8 1 7 3 1
3 6 1
3 4
2 13 7
103 11 290 215`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// lower bound 이분탐색 활용
const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const [N, M] = input().split(" ").map(Number);
    let count = 0;

    const A = input()
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b);

    const B = input()
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = 0; i < N; i += 1) {
      const target = A[i];
      count += binarySearch(target, B);
    }

    result.push(count);
  }

  return result.join("\n");
};

const binarySearch = (target, arr) => {
  let start = 0;
  let end = arr.length - 1;
  let result = arr.length;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] < target) {
      start = mid + 1;
    } else {
      result = Math.min(result, mid);
      end = mid - 1;
    }
  }

  return result;
};

console.log(solution());
