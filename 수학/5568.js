const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
3
72
2
12
7
2
1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const N = Number(input());
const K = Number(input());
const result = new Set();

const solution = () => {
  const arr = [];
  const selectedNumber = [];
  const selectedCheck = new Array(N).fill(false);

  for (let i = 0; i < N; i++) {
    arr.push(Number(input()));
  }

  dfs(0, arr, selectedNumber, selectedCheck);

  return result.size;
};

const dfs = (cnt, arr, selectedNumber, selectedCheck) => {
  if (cnt === K) {
    const number = Number(selectedNumber.join(""));

    result.add(number);

    return;
  }

  for (let i = 0; i < N; i++) {
    if (selectedCheck[i] === true) continue;

    selectedCheck[i] = true;
    selectedNumber.push(arr[i]);
    dfs(cnt + 1, arr, selectedNumber, selectedCheck);
    selectedNumber.pop();
    selectedCheck[i] = false;
  }
};

console.log(solution());
