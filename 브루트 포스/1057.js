const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `60000 101 891`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [N, player1, player2] = input().split(" ").map(Number);
  let result = 0;

  while (player1 !== player2) {
    player1 -= parseInt(player1 / 2);
    player2 -= parseInt(player2 / 2);
    result += 1;
  }

  return result;
};

console.log(solution());
