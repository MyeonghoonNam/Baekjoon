const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 0 0 3 0 2 2 0 3 0 0 5 4 0 1 1 0 4
4 1 0 3 0 2 4 1 0 1 1 3 0 0 5 1 1 3
5 0 0 4 0 1 2 2 1 2 0 3 1 0 4 0 0 5
5 0 0 3 1 1 2 1 2 2 0 3 0 0 5 1 0 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 6개의 팀이 경기하는 상대의 경우의 수
const team1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
const team2 = [1, 2, 3, 4, 5, 2, 3, 4, 5, 3, 4, 5, 4, 5, 5];

const answer = new Array(4).fill(0);
const match = Array.from(new Array(6), () => new Array(3).fill(0)); // 입력
const result = Array.from(new Array(6), () => new Array(3).fill(0)); // 입력값에 따른 가능 여부 판단

const dfs = (t, round) => {
  if (round === 15) {
    if (answer[t]) return;

    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        if (match[r][c] !== result[r][c]) return;
      }
    }

    answer[t] = 1;
    return;
  }

  let t1 = team1[round];
  let t2 = team2[round];

  // 승, 패
  result[t1][0]++;
  result[t2][2]++;
  dfs(t, round + 1);
  result[t1][0]--;
  result[t2][2]--;

  // 무, 무
  result[t1][1]++;
  result[t2][1]++;
  dfs(t, round + 1);
  result[t1][1]--;
  result[t2][1]--;

  // 패, 승
  result[t1][2]++;
  result[t2][0]++;
  dfs(t, round + 1);
  result[t1][2]--;
  result[t2][0]--;
};

const solution = () => {
  for (let t = 0; t < 4; t++) {
    const data = input().split(" ").map(Number);
    let index = 0;

    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 3; c++) {
        match[r][c] = data[index];
        index += 1;
      }
    }

    dfs(t, 0);
  }

  return answer.join(" ");
};

console.log(solution());
