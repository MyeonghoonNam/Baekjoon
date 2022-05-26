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

    if (this.isEmpty()) {
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
    pop_node.next = this.head;

    if (this.size === 1) {
      this.tail = null;
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
    : `......
......
......
......
......
......
......
......
.Y....
.YG...
RRYG..
RRYGG.`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 같은 색 뿌요가 4개 이상 상하좌우로 연결되어 있으면 연결된 같은 색 뿌요들이 모두 소멸 => 1연쇄
 * 터진 후 뿌요들이 내려오고 다시 터짐을 반복할 때마다 1연쇄씩 증가
 *
 * 요구사항: 주어진 상대방의 필드정보에서 연쇄 발생 횟수 도출, 하나의 연쇄도 없다면 0을 출력
 */
const solution = () => {
  const row = 12;
  const column = 6;
  const map = [];
  let result = 0;

  for (let i = 0; i < row; i++) {
    map.push(input().split(""));
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const chain = (x, y) => {
    const queue = new Queue();
    const visited = Array.from(new Array(row), () =>
      new Array(column).fill(false)
    );
    const chain_position = [];
    let count_puyo = 1;

    queue.enqueue([x, y]);
    chain_position.push([x, y]);
    visited[x][y] = true;

    while (!queue.isEmpty()) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny)) continue;

        if (!visited[nx][ny] && map[nx][ny] === map[x][y]) {
          queue.enqueue([nx, ny]);
          chain_position.push([nx, ny]);
          visited[nx][ny] = true;
          count_puyo++;
        }
      }
    }

    if (count_puyo >= 4) {
      chain_position.forEach(([x, y]) => {
        map[x][y] = ".";
      });

      return true;
    }

    return false;
  };

  const down = () => {
    for (let x = row - 2; x >= 0; x--) {
      for (let y = 0; y < 6; y++) {
        let index = -1;

        if (map[x][y] !== ".") {
          index = getBottomPosition(x, y);
        }

        if (index !== -1) {
          map[index][y] = map[x][y];
          map[x][y] = ".";
        }
      }
    }
  };

  const getBottomPosition = (x, y) => {
    let index = -1;
    for (let i = x; i < row; i++) {
      if (map[i][y] === ".") {
        index = i;
      }
    }

    return index;
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < row && y < column) return true;
    else return false;
  };

  const process = () => {
    while (true) {
      let flag = false;

      for (let x = row - 1; x >= 0; x--) {
        for (let y = 0; y < column; y++) {
          if (map[x][y] === ".") continue;

          if (chain(x, y)) {
            flag = true;
          }
        }
      }

      if (!flag) break;

      result++;
      down();
    }
  };

  process();
  return result;
};

console.log(solution());
