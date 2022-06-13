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
    const new_node = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = new_node;
    } else {
      this.tail.next = new_node;
      this.tail = new_node;
    }

    this.size++;
  }

  dequeue() {
    if (this.size === 0) return;

    const pop_node = this.head;
    this.head = pop_node.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size--;
    return pop_node.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
1 1 1 1 1 1
2 2 6 2 2 3
2 2 5 2 2 3
2 2 2 4 6 3
0 0 0 0 0 6
0 0 0 0 0 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 가로, 세로의 크기 N, 물고기 M마리, 아기 상어 1마리, 한 칸에는 물고기 최대 1마리
 * 가장 처음 아기 상어의 크기는 2, 1초에 상하좌우 인접한 한 칸씩 이동가능
 * 아기 상어는 자신의 크기보다 큰 물고기가 있는 칸은 지나갈 수 없다.
 * 아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있고, 같은 크기의 물고기는 먹을 수 없지만 칸은 이동가능
 *
 * 0: 빈칸
 * 1 ~ 6: 물고기의 크기
 * 9: 아기 상어
 *
 * 요구사항: 아기 상어가 몇 초 동안 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는지 도출
 *
 * 가장 가까운 물고기 찾기 (bfs로 거리 테이블 반환)
 */
const solution = () => {
  const N = Number(input());
  const map = [];
  const shark = { x_pos: 0, y_pos: 0, size: 0 };

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    map.push(row);

    for (let j = 0; j < N; j++) {
      if (map[i][j] === 9) {
        shark.x_pos = i;
        shark.y_pos = j;
        shark.size = 2;
        map[i][j] = 0;
      }
    }
  }

  const bfs = () => {
    const distance = Array.from(new Array(N), () => new Array(N).fill(-1));
    const queue = new Queue();

    queue.enqueue([shark.x_pos, shark.y_pos]);
    distance[shark.x_pos][shark.y_pos] = 0;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (!queue.isEmpty()) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny)) continue;

        if (distance[nx][ny] === -1 && map[nx][ny] <= shark.size) {
          distance[nx][ny] = distance[x][y] + 1;
          queue.enqueue([nx, ny]);
        }
      }
    }

    return distance;
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  const find = (distance) => {
    let fish_xPos = 0;
    let fish_yPos = 0;
    let min_distance = Infinity;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (distance[i][j] !== -1 && 1 <= map[i][j] && map[i][j] < shark.size) {
          if (distance[i][j] < min_distance) {
            fish_xPos = i;
            fish_yPos = j;
            min_distance = distance[i][j];
          }
        }
      }
    }

    if (min_distance === Infinity) {
      return false;
    } else {
      return [fish_xPos, fish_yPos, min_distance];
    }
  };

  const process = () => {
    let result = 0;
    let eat = 0;

    while (true) {
      const distance = bfs();
      const fish_values = find(distance);

      if (fish_values === false) break;

      const [x, y, dist] = fish_values;

      shark.x_pos = x;
      shark.y_pos = y;
      result += dist;

      map[x][y] = 0;
      eat += 1;

      if (eat >= shark.size) {
        shark.size += 1;
        eat = 0;
      }
    }

    return result;
  };

  const result = process();
  return result;
};

console.log(solution());
