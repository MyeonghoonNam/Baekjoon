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
    const new_node = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = new_node;
    } else {
      this.tail.next = new_node;
      this.tail = new_node;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.size === 0) return;

    const pop_node = this.head;
    this.head = pop_node.next;

    if (this.size === 1) {
      this.tail = null;
    }

    this.size -= 1;
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
    : `2 20 50
50 30
20 40`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 국경선을 공유하는 두 나라의 인구 차이 x, R >= x >= L 라면 국경선 오픈
 * 열어야하는 국경선이 모두 열렸다면 인구 이동 시작
 * 연합: 국경선이 열려있어 인접한 칸을 이동할 수 있는경우
 * 연합을 이루는 각 칸의 인구수 = 연합의 인구수 / 연합을 이루는 칸의 개수(소수 생략)
 * 연합 해체 후 모든 국경선 닫는다.
 *
 * 요구사항 : 인구 이동이 며칠 동안 발생하는지 도출
 *
 * 1. 모든 국가를 확인하며 국경선 오픈
 * 2. 인구 이동 후 연합을 통한 나라의 인구 수 갱신
 * 3. 국경선 닫기
 * 4. 일 수 갱신 후 국경선을 오픈 못할 때 까지 1~3 반복
 */

const solution = () => {
  const [N, L, R] = input().split(" ").map(Number);
  const map = [];
  let visited = [];

  for (let i = 0; i < N; i++) {
    const data = input().split(" ").map(Number);
    map.push(data);
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const bfs = (start_x, start_y) => {
    const queue = new Queue();

    queue.enqueue([start_x, start_y]);
    visited[start_x][start_y] = true;

    const united_state = [[start_x, start_y]];
    let united_people = map[start_x][start_y];
    let united_country = 1;

    while (!queue.isEmpty()) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny) || visited[nx][ny]) continue;

        const diff_people = Math.abs(map[x][y] - map[nx][ny]);

        if (diff_people >= L && diff_people <= R) {
          queue.enqueue([nx, ny]);
          visited[nx][ny] = true;
          united_state.push([nx, ny]);
          united_people += map[nx][ny];
          united_country += 1;
        }
      }
    }

    for (let i = 0; i < united_state.length; i++) {
      const [x, y] = united_state[i];
      map[x][y] = parseInt(united_people / united_country);
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  const onProcess = () => {
    let result = 0; // 인구 이동 일 수

    while (true) {
      let index = 0; // 전체 나라를 탐색했는지 확인하기 위한 index
      visited = Array.from(new Array(N), () => new Array(N).fill(false));

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (!visited[i][j]) {
            bfs(i, j);
            index += 1;
          }
        }
      }

      if (index === N * N) break;
      result += 1;
    }

    return result;
  };

  return onProcess();
};

console.log(solution());
