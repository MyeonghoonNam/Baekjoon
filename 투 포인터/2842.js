const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
P.
.K
2 1
3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.isEmpty()) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size -= 1;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const N = Number(input());
  const map = [];
  const fatigueLevelMap = [];
  let fatigueLevelValue = [];
  let result = Number.MAX_SAFE_INTEGER;

  let px = 0;
  let py = 0;
  let houseCount = 0;

  let start = 0;
  let end = 0;

  for (let i = 0; i < N; i++) {
    map.push(input().split(""));
  }

  for (let i = 0; i < N; i++) {
    fatigueLevelMap.push(input().split(" ").map(Number));
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const structure = map[i][j];
      const fatigue = fatigueLevelMap[i][j];

      if (structure === "P") {
        px = i;
        py = j;
      } else if (structure === "K") {
        houseCount += 1;
      }

      fatigueLevelValue.push(fatigue);
    }
  }

  fatigueLevelValue = [
    ...new Set([...fatigueLevelValue.sort((a, b) => a - b)]),
  ];

  const bfs = (x, y) => {
    const queue = new Queue();
    const visited = Array.from(new Array(N), () => new Array(N).fill(false));
    let visitedHouseCount = 0;

    queue.enqueue([x, y]);
    visited[x][y] = true;

    const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
    const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

    while (!queue.isEmpty()) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 8; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!isMoveRangeMap(nx, ny)) continue;

        if (!visited[nx][ny] && isValidFatigue(fatigueLevelMap[nx][ny])) {
          queue.enqueue([nx, ny]);
          visited[nx][ny] = true;

          if (map[nx][ny] === "K") {
            visitedHouseCount += 1;
          }
        }
      }
    }

    return visitedHouseCount;
  };

  const isMoveRangeMap = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  const isValidFatigue = (value) => {
    if (fatigueLevelValue[start] <= value && fatigueLevelValue[end] >= value)
      return true;
    else return false;
  };

  while (start < fatigueLevelValue.length && end < fatigueLevelValue.length) {
    let visitedHouseCount = 0;

    if (
      fatigueLevelValue[start] <= fatigueLevelMap[px][py] &&
      fatigueLevelValue[end] >= fatigueLevelMap[px][py]
    ) {
      visitedHouseCount = bfs(px, py);
    }

    if (visitedHouseCount === houseCount) {
      const fatigueDiff = fatigueLevelValue[end] - fatigueLevelValue[start];
      result = Math.min(result, fatigueDiff);
      start += 1;
    } else {
      end += 1;
    }
  }

  return result;
};

console.log(solution());
