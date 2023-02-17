const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `XXXXXX`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let board = input();

  board = board.replaceAll("XXXX", "AAAA");
  board = board.replaceAll("XX", "BB");

  if (board.includes("X")) {
    return -1;
  }

  return board;
};

console.log(solution());
