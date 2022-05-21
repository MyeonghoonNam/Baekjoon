const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
10 20 10 30 20 50`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const arr = [numbers[0]];

  for (let i = 1; i < N; i++) {
    if (arr[arr.length - 1] < numbers[i]) {
      arr.push(numbers[i]);
    } else {
      const index = lowerBound(numbers[i], arr);
      arr[index] = numbers[i];
    }
  }

  return arr.length;
};

const lowerBound = (target, numbers) => {
  let low = 0;
  let high = numbers.length - 1;

  while (low < high) {
    const mid = parseInt((low + high) / 2);
    if (numbers[mid] >= target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return high;
};

console.log(solution());
