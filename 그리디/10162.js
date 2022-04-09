const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `210`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const button_time = [300, 60, 10]; // A, B, C버튼 시간
  let time = Number(input());
  let result = [];

  if (time % 10 !== 0) {
    return -1;
  }

  let i = 0;
  while (i < button_time.length) {
    result.push(Math.floor(time / button_time[i]));
    time %= button_time[i];
    i++;
  }

  return result.join(" ");
};

console.log(solution());
