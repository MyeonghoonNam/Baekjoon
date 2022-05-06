const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 4
ohhenrie
charlie
baesangwook
obama
baesangwook
ohhenrie
clinton`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 듣도 못한 사람의 명단, 보도 못한 사람의 명단이 주어진다.
 *
 * 요구사항: 듣지도 못하고 보지도 못한 사람의 명단을 도출
 */
const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const set = new Set();
  let count = 0;
  let names = [];

  for (let i = 0; i < N; i++) {
    const name = input();
    set.add(name);
  }

  for (let i = 0; i < M; i++) {
    const name = input();

    if (set.has(name)) {
      count += 1;
      names.push(name);
    }
  }

  names.sort();
  return `${count}\n${names.join("\n")}`;
};

console.log(solution());
