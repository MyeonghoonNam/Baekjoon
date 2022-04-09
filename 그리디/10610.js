const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `102`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const data = input();
  const reg = /0/g;

  // 30은 10과 3의 배수판정법으로 판별 가능
  if (!reg.test(data))
    return -1; // 일의 자리가 0이 될 수 없으면 10의 배수가 아니다.
  else {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      const number = Number(data[i]);
      sum += number;
    }

    if (sum % 3 === 0) {
      // 10의 배수이며 3의 배수이다.
      const max_number = data
        .split("")
        .map(Number)
        .sort((a, b) => b - a)
        .join("");

      return max_number;
    } else {
      // 각 자리수의 합이 3으로 나누어떨어지지 않으므로 3의 배수가 아니다.
      return -1;
    }
  }
};

console.log(solution());
