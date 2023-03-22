const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
29
38
12
57
74
40
85
61`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const numbers = stdin.map(Number);
  const maxValue = Math.max(...numbers);
  const maxValueIndex = numbers.indexOf(maxValue) + 1;

  const result = `${maxValue}\n${maxValueIndex}`;

  return result;
};

console.log(solution());
