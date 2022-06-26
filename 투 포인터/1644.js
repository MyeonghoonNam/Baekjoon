const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `53`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const MAX = 4000001;
  const arr = new Array(MAX).fill(true);

  const isPrimeNumber = () => {
    // 에라토스테네스의 체
    for (let i = 2; i < Math.sqrt(MAX); i++) {
      for (let j = i * 2; j <= MAX; j += i) {
        arr[j] = false;
      }
    }

    // 0과 1처리
    arr[0] = arr[1] = false;
  };

  const getSumCase = () => {
    let prime = [0];
    let sum = 0;

    for (let i = 2; i <= MAX; i++) {
      if (arr[i] === true) {
        sum += i;
        prime.push(sum);
      }
    }

    let result = 0;
    let start = 0;
    let end = 0;

    while (start <= end && end < prime.length) {
      if (prime[end] - prime[start] > N) {
        start++;
      } else if (prime[end] - prime[start] < N) {
        end++;
      } else {
        result++;
        end++;
      }
    }

    return result;
  };

  const process = () => {
    isPrimeNumber();
    return getSumCase();
  };

  const result = process();
  return result;
};

console.log(solution());
