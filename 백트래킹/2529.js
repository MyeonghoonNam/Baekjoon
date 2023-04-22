const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
> < < < > > > < <`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const K = Number(input());
  const sign = input().split(" ");
  const numbers = [];
  const visited = new Array(10).fill(false);
  const result = [];

  const dfs = (cnt) => {
    if (cnt === K + 1) {
      let isPossible = true;

      for (let i = 0; i < K; i++) {
        if (sign[i] === "<") {
          if (numbers[i] > numbers[i + 1]) isPossible = false;
        } else if (sign[i] === ">") {
          if (numbers[i] < numbers[i + 1]) isPossible = false;
        }
      }

      if (isPossible) {
        result.push(numbers.join(""));
      }

      return;
    }

    for (let i = 0; i < 10; i++) {
      if (!visited[i]) {
        visited[i] = true;
        numbers.push(i);
        dfs(cnt + 1);
        numbers.pop();
        visited[i] = false;
      }
    }
  };

  dfs(0);

  result.sort((a, b) => a - b);

  return `${result[result.length - 1]}\n${result[0]}`;
};

console.log(solution());
