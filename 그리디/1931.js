const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `11
1 4
3 5
0 6
5 7
3 8
5 9
6 10
8 11
8 12
2 13
12 14`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const times = [];
  let result = 1;

  for (let i = 0; i < N; i++) {
    const [startTime, endTime] = input().split(" ").map(Number);
    times.push({ startTime, endTime });
  }

  times.sort((a, b) => a.endTime - b.endTime || a.startTime - b.startTime);

  let currentIndex = 0;
  for (let i = 1; i < N; i++) {
    if (times[currentIndex].endTime <= times[i].startTime) {
      result += 1;
      currentIndex = i;
    }
  }

  return result;
};

console.log(solution());
