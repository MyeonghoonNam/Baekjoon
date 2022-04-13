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

  for (let i = 0; i < N; i++) {
    const [start_time, end_time] = input().split(" ").map(Number);
    times.push({ start_time, end_time });
  }

  // 회의 종료 시간을 기준으로 오름차순 정렬
  times.sort((a, b) => a.end_time - b.end_time || a.start_time - b.start_time);

  let prev_time = 0; // 이전 회의 종료 시간
  let result = 0;

  for (let i = 0; i < N; i++) {
    if (prev_time <= times[i].start_time) {
      prev_time = times[i].end_time;
      result += 1;
    }
  }

  return result;
};

console.log(solution());
