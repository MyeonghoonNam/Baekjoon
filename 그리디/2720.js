const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
124
25
194`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const COIN_CONFIG_COUNT = 4;
  const COIN = {
    0: { name: "QUARTER", price: 25 },
    1: { name: "DIME", price: 10 },
    2: { name: "NICKEL", price: 5 },
    3: { name: "PENNY", price: 1 },
  };

  let result = [];
  let T = Number(input());

  while (T--) {
    let C = Number(input());
    const config = [];

    for (let i = 0; i < COIN_CONFIG_COUNT; i++) {
      const price = COIN[i].price;
      const coinCount = parseInt(C / price);

      config.push(coinCount);
      C -= coinCount * price;
    }

    result.push(config.join(" "));
  }

  return result.join("\n");
};

console.log(solution());
