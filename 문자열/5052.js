const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3
911
97625999
91125426
5
113
12340
123440
12345
98346`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = input(Number);

  while (T--) {
    const N = input(Number);
    const numbers = [];
    let isConsistence = true;

    for (let i = 0; i < N; i++) {
      numbers.push(input());
    }

    numbers.sort();

    for (let i = 1; i < N; i++) {
      const prefixLength = numbers[i - 1].length;

      if (numbers[i].slice(0, prefixLength) === numbers[i - 1]) {
        isConsistence = false;
        break;
      }
    }

    isConsistence ? result.push("YES") : result.push("NO");
  }

  return result.join("\n");
};

console.log(solution());
