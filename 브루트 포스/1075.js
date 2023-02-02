const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2000000000
100`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = input();
  const F = input();
  const prefixNumber = N.slice(0, -2);

  let i = 0;
  while (i < 100) {
    const suffixNumber = i < 10 ? `0${i}` : String(i);
    const totalNumber = prefixNumber + suffixNumber;

    if (totalNumber % F === 0) {
      return suffixNumber;
    }

    i++;
  }
};

console.log(solution());
