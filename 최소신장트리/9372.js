const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3 3
1 2
2 3
1 3
5 4
2 1
2 3
4 3
4 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  // 문제에서 간선에 가중치는 존재하지 않고, 모든 노드를 방문할 수 있는 최소 엣지 방문 횟수를 답으로 원하고 있다. (비행기 경로가 단순한 간선으로 제시되어 있다. 그리고 모든 노드를 방문하는 경로가 존재한다는 전재 조건이 깔려있다.)
  // 그렇기에 MST의 간선 개수가 항상 최소 경로 수를 나타내므로 전체 노드 수 - 1이 항상 답으로 이루어진다.

  const result = [];
  let T = Number(input());

  while (T--) {
    const [N, M] = input().split(" ").map(Number);

    for (let i = 0; i < M; i++) {
      const [start, end] = input().split(" ").map(Number);
    }

    result.push(N - 1);
  }

  return result.join("\n");
};

console.log(solution());
