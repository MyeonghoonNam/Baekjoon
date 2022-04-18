const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2 7
2 3 2 3 1 2 7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const schedule = input().split(" ").map(Number);
  const plug = new Array(N).fill(0);
  let result = 0;

  for (let i = 0; i < K; i++) {
    let flag = false; // 플러그 꽂혀있는지 유무판별

    // 해당기기가 이미 꽂혀있는지
    for (let j = 0; j < N; j++) {
      if (plug[j] === schedule[i]) {
        flag = true;
        break;
      }
    }

    if (flag) continue;

    // 빈 구멍 확인
    for (let j = 0; j < N; j++) {
      if (!plug[j]) {
        plug[j] = schedule[i];
        flag = true;
        break;
      }
    }

    if (flag) continue;

    // 가장 나중에 다시 사용되거나, 앞으로 사용하지 않을 기기 찾기
    let idx = -1;
    let device_idx = -1;
    for (let j = 0; j < N; j++) {
      let last_idx = 0;

      for (let k = i + 1; k < K; k++) {
        if (plug[j] === schedule[k]) break;
        last_idx++;
      }

      if (last_idx > device_idx) {
        idx = j;
        device_idx = last_idx;
      }
    }

    result += 1;
    plug[idx] = schedule[i];
  }

  return result;
};

console.log(solution());
