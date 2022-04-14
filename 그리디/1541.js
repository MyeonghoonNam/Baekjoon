const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `09-5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const expression = input().split("-");
  const numbers = [];

  for (let i = 0; i < expression.length; i++) {
    const plus_list = expression[i].split("+");
    let plus_value = 0;

    for (let j = 0; j < plus_list.length; j++) {
      plus_value += Number(plus_list[j]);
    }

    numbers.push(plus_value);
  }

  const result = numbers.reduce((acc, cur) => {
    return acc - cur;
  });

  return result;
};

console.log(solution());
