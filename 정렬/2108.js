const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
0
0
-1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = [];

  for (let i = 0; i < N; i++) {
    numbers.push(Number(input()));
  }

  numbers.sort((a, b) => a - b);

  const getAverage = () => {
    const result = numbers.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return Math.round(result / N);
  };

  const getMedian = () => {
    const result = numbers[parseInt(N / 2)];
    return result;
  };

  const getMode = () => {
    let maxCount = 1;

    const numberMap = numbers.reduce((acc, cur) => {
      if (acc.get(cur)) {
        acc.set(cur, acc.get(cur) + 1);
        maxCount = Math.max(maxCount, acc.get(cur));
      } else {
        acc.set(cur, 1);
      }

      return acc;
    }, new Map());

    const modeArr = [];
    for (let [key, value] of numberMap) {
      if (value === maxCount) {
        modeArr.push(key);
      }
    }

    let result = 0;
    if (modeArr.length === 1) {
      result = modeArr[0];
    } else {
      result = modeArr[1];
    }

    return result;
  };

  const getRange = () => {
    const result = numbers[N - 1] - numbers[0];
    return result;
  };

  const average = getAverage();
  const median = getMedian();
  const mode = getMode();
  const range = getRange();

  const result = `${average}\n${median}\n${mode}\n${range}`;
  return result;
};

console.log(solution());
