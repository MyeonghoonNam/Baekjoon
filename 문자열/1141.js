const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
topcoder
topcoder
topcoding`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const words = [];
  let result = N;

  for (let i = 0; i < N; i++) {
    words.push(input());
  }

  words.sort((a, b) => a.length - b.length);

  for (let i = 0; i < words.length; i++) {
    let hasPrefix = false;

    for (let j = i + 1; j < words.length; j++) {
      if (words[j].substring(0, words[i].length) === words[i]) {
        hasPrefix = true;
      }
    }

    if (hasPrefix) result--;
  }

  return result;
};

console.log(solution());
