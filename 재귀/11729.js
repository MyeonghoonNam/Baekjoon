const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const print = [];
  let move = 0;

  const hanoi = (N, start, end, sub) => {
    if (N === 1) {
      print.push(`${start} ${end}`);
      move += 1;
      return;
    } else {
      hanoi(N - 1, start, sub, end);
      print.push(`${start} ${end}`);
      move += 1;
      hanoi(N - 1, sub, end, start);
    }
  };

  hanoi(N, 1, 3, 2);

  const result = [move, ...print].join("\n");

  return result;
};

console.log(solution());
