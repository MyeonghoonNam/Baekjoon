const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
9 9 9 9 9 9 9
9 9 9 9 9 9 9
9 9 9 9 9 9 9
9 9 9 9 9 9 9
9 9 9 9 9 9 9
9 9 9 9 9 9 9
9 9 9 9 9 9 9`
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
    this.head = this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.size === 0) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = null;
    }

    this.size--;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

/**
 * 어떤 지역에 비가 내렸을 때 물에 잠기지 않는 안전한 영역 최대 개수 도출
 * 행과 열은 각각 N으로 동일하며, 2차원 배열의 원소는 해당 지역의 높이를 나타낸다.
 * 물에 잠기지 않는 안전한 영역 = 물에 잠기지 않는 지점들이 상,하,좌,우로 인접해 있으며 그 크기가 최대인 영역
 */

const solution = () => {
  const N = Number(input());
  const heightMap = [];
  const submergedMap = Array.from(new Array(N), () => new Array(N).fill(0));
  let visited = [];
  let minHeight = Number.MAX_SAFE_INTEGER;
  let maxHeight = Number.MIN_SAFE_INTEGER;
  let result = 1;

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    const min = Math.min(...row);
    const max = Math.max(...row);

    if (min < minHeight) {
      minHeight = min;
    }

    if (max > maxHeight) {
      maxHeight = max;
    }

    heightMap.push(row);
  }

  const bfs = (x, y) => {
    const queue = new Queue();
    queue.enqueue([x, y]);
    visited[x][y] = true;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (queue.isEmpty() === false) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (checkRangeMap(nx, ny) === false) continue;

        if (visited[nx][ny] === false && submergedMap[nx][ny] === 0) {
          queue.enqueue([nx, ny]);
          visited[nx][ny] = true;
        }
      }
    }
  };

  const checkRangeMap = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  for (let h = minHeight; h < maxHeight; h++) {
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (heightMap[x][y] === h) {
          submergedMap[x][y] = 1;
        }
      }
    }

    let areaCount = 0;
    visited = Array.from(new Array(N), () => new Array(N).fill(false));
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        if (visited[x][y] === false && submergedMap[x][y] === 0) {
          bfs(x, y);
          areaCount++;
        }
      }
    }

    if (result < areaCount) {
      result = areaCount;
    }
  }

  return result;
};

console.log(solution());
