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
    this.size--;

    if (this.size === 1) {
      this.tail = this.head;
    }

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
    : `7 7
1 1 1 0 1 1 1
1 1 1 0 1 1 1
1 1 1 0 1 1 1
0 0 0 0 0 0 0
1 1 1 0 1 1 1
1 1 1 0 1 1 1
1 1 1 0 1 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const map = [];
  const edges = [];
  const parent_table = new Array(7).fill(0).map((_, i) => i);
  let island_count = 0;
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, -1, 1];
  let result = 0;

  const initMap = () => {
    for (let i = 0; i < N; i++) {
      const row = input().split(" ").map(Number);

      for (let j = 0; j < M; j++) {
        if (row[j] === 1) {
          row[j] = -1;
        }
      }

      map.push(row);
    }
  };

  const setNumberArea = () => {
    let number = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === -1) {
          bfs(i, j, ++number);
        }
      }
    }

    island_count = number;
  };

  const setEdges = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        for (let d = 0; d < 4; d++) {
          if (map[i][j] !== 0) {
            moveMap(i, j, d);
          }
        }
      }
    }

    edges.sort((a, b) => a.dist - b.dist);
  };

  const moveMap = (x, y, direction) => {
    let dist = 0;
    const number = map[x][y];
    let nx = x;
    let ny = y;

    while (true) {
      nx += dx[direction];
      ny += dy[direction];

      if (!checkMapRange(nx, ny) || map[nx][ny] === number) break;
      if (map[nx][ny] === 0) {
        dist++;
      } else {
        if (dist >= 2) {
          edges.push({ start: number, end: map[nx][ny], dist });
        }

        break;
      }
    }
  };

  const bfs = (x, y, number) => {
    const queue = new Queue();

    queue.enqueue({ x, y });
    map[x][y] = number;

    while (!queue.isEmpty()) {
      const { x, y } = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (checkMapRange(nx, ny) && map[nx][ny] === -1) {
          queue.enqueue({ x: nx, y: ny });
          map[nx][ny] = number;
        }
      }
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  const findParent = (parent, number) => {
    if (parent[number] !== number) {
      parent[number] = findParent(parent, parent[number]);
    }

    return parent[number];
  };

  const unionParent = (parent, start, end) => {
    start = findParent(parent, start);
    end = findParent(parent, end);

    if (start < end) {
      parent[end] = start;
    } else {
      parent[start] = end;
    }
  };

  const kruskal = () => {
    let count = 1;

    edges.forEach(({ start, end, dist }) => {
      if (findParent(parent_table, start) !== findParent(parent_table, end)) {
        unionParent(parent_table, start, end);
        result += dist;
        count += 1;
      }
    });

    if (count !== island_count) {
      result = -1;
    }
  };

  const onProcess = () => {
    initMap();
    setNumberArea();
    setEdges();
    kruskal();
  };

  onProcess();
  return result;
};

console.log(solution());
