const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
10 20 10 30 15 50`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const lis = [numbers[0]];
  const lis_index = [0];

  for (let i = 1; i < N; i++) {
    if (lis[lis.length - 1] < numbers[i]) {
      lis.push(numbers[i]);
      lis_index[i] = lis.length - 1;
    } else {
      const index = lowerBound(numbers[i], lis);

      lis[index] = numbers[i];
      lis_index[i] = index;
    }
  }

  const result = [];
  let find_index = lis.length - 1;

  for (let i = N - 1; i >= 0; i--) {
    if (lis_index[i] === find_index) {
      find_index--;
      result.push(numbers[i]);
    }
  }

  return `${result.length}\n${result.reverse().join(" ")}`;
};

const lowerBound = (target, lis) => {
  let low = 0;
  let high = lis.length - 1;

  while (low < high) {
    const mid = parseInt((low + high) / 2);

    if (lis[mid] >= target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
};

console.log(solution());
