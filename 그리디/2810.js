const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
SLLS`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = input(Number);
  const seat = input();
  const coupleSeatCount = seat.match(/LL/g) ? seat.match(/LL/g).length : 0;

  const result = coupleSeatCount <= 1 ? N : N - (coupleSeatCount - 1);

  return result;
};

console.log(solution());
