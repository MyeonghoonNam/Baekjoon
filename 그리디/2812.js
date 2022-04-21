const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 4
4177252841`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [N, K] = input().split(" ").map(Number);
  const number = input();
  const stack = [];

  for (let i = 0; i < N; i++) {
    const current_number = Number(number[i]);

    while (
      stack.length !== 0 &&
      current_number > stack[stack.length - 1] &&
      K > 0
    ) {
      stack.pop();
      K -= 1;
    }

    stack.push(current_number);
  }

  // 내림차순으로 나열된 숫자인 경우
  for (let i = 0; i < K; i++) {
    stack.pop();
  }

  return stack.join("");
};

console.log(solution());
