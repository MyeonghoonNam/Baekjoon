const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `474747`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const number = Number(input());
  let result = "";

  for (let i = number; i >= 4; i--) {
    if (getMaxNumber(i)) {
      result = i;

      break;
    }
  }

  return result;
};

const getMaxNumber = (number) => {
  while (number) {
    if (number % 10 === 4 || number % 10 === 7) {
      number = Math.floor(number / 10);
    } else {
      return false;
    }
  }
  return true;
};

console.log(solution());
