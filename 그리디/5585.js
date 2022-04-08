const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `999`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const cost = [500, 100, 50, 10, 5, 1];
  const pay = Number(input());
  let change = 1000 - pay;
  let result = 0;

  for (let i = 0; i < cost.length; i++) {
    if (change >= cost[i]) {
      result += Math.floor(change / cost[i]);
      change %= cost[i];
    }
  }

  return result;
};

console.log(solution());
