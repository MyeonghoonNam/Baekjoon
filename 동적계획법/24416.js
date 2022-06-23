const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `30`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());

  const fibonacci = (num) => {
    const dp = [];
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;

    for (let i = 3; i <= num; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }

    return `${dp[num]} ${num - 2}`;
  };

  const result = fibonacci(N);
  return result;
};

console.log(solution());
