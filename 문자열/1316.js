const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `1
z`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  let result = 0;

  const check = (word) => {
    const set = new Set(word[0]);

    for (let i = 0; i < word.length - 1; i++) {
      if (word[i] === word[i + 1]) continue;

      if (!set.has(word[i + 1])) {
        set.add(word[i + 1]);
      } else {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i < N; i++) {
    const word = input();

    if (check(word)) {
      result++;
    }
  }

  return result;
};

console.log(solution());
