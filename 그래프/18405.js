const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 3
1 0 2
0 0 0
3 0 0
1 2 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 바이러스는 1 ~ K번 바이러스 종류 중 하나에 속한다
 * 모든 바이러스는 1초마다 상,하,좌,우 방향으로 증식한다.
 * 매 초마다 번호가 낮은 종류의 바이러스부터 먼저 증식
 * 증식 과정에 특정한 칸에 바이러스가 존재하면 그곳에 다른 바이러스는 증식 불가
 *
 * 요구사항: S초가 지난 후 (X, Y)에 존재하는 바이러스의 종류 출력
 * S초가 지난 후 해당 위치에 바이러스가 존재하지 않는다면 0 출력
 * 시험관의 가장 왼쪽 위는 (1, 1)에 해당한다
 *
 * 1. 지도에서 바이러스에 대한 정보(종류, 시간, 좌표)를 따로 기록하며 바이러스 종류를 기준으로 오름차순 정렬
 * 2. bfs구현 (큐 구현)
 * 3. 시간 만료시 특정 좌표값 도출
 */

// 2차 해결

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
  const [N, K] = input().split(" ").map(Number);
  const graph = [];
  const visited = Array.from(new Array(N), () => new Array(N).fill(false));
  const virus = [];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    graph.push(row);

    for (let j = 0; j < row.length; j++) {
      if (row[j] !== 0) {
        virus.push({ x: i, y: j, number: row[j], time: 0 });
      }
    }
  }

  const [S, X, Y] = input().split(" ").map(Number);

  const bfs = () => {
    const queue = new Queue();

    virus.sort((a, b) => a.number - b.number);

    for (let i = 0; i < virus.length; i++) {
      const value = virus[i];

      queue.enqueue(value);
      visited[value.x][value.y] = true;
    }

    while (!queue.isEmpty()) {
      const { number, x, y, time } = queue.dequeue();

      if (time === S) {
        return;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny)) continue;

        if (!visited[nx][ny] && graph[nx][ny] === 0) {
          queue.enqueue({ number, x: nx, y: ny, time: time + 1 });
          graph[nx][ny] = number;
          visited[nx][ny] = true;
        }
      }
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  bfs();

  const result = graph[X - 1][Y - 1];

  return result;
};

// 1차 해결
// const solution = () => {
//   const checkMapRange = (x, y) => {
//     if (x >= 0 && x < N && y >= 0 && y < N) return true;
//     else return false;
//   };

//   const [N, K] = input().split(" ").map(Number);
//   const map = [];
//   const virus = [];

//   for (let i = 0; i < N; i++) {
//     const data = input().split(" ").map(Number);
//     map.push(data);

//     for (let j = 0; j < N; j++) {
//       if (data[j] !== 0) {
//         virus.push({ virus: data[j], time: 0, x: i, y: j });
//       }
//     }
//   }

//   const [S, X, Y] = input().split(" ").map(Number);
//   virus.sort((a, b) => a.virus - b.virus);

//   const queue = new Queue();

//   for (let i = 0; i < virus.length; i++) {
//     queue.enqueue(virus[i]);
//   }

//   const dx = [-1, 1, 0, 0];
//   const dy = [0, 0, -1, 1];

//   while (!queue.isEmpty()) {
//     const { virus, time, x, y } = queue.dequeue();

//     if (time === S) break;

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (checkMapRange(nx, ny) && map[nx][ny] === 0) {
//         map[nx][ny] = virus;
//         queue.enqueue({ virus, time: time + 1, x: nx, y: ny });
//       }
//     }
//   }

//   const result = map[X - 1][Y - 1];
//   return result;
// };

console.log(solution());
