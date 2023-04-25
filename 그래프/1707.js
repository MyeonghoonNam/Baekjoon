const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3 2
1 3
2 3
4 4
1 2
2 3
3 4
4 2`
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
  const result = [];
  let K = Number(input());

  while (K--) {
    const [V, E] = input().split(" ").map(Number);
    const graph = Array.from(new Array(V + 1), () => []);
    const visited = new Array(V + 1).fill(false);
    const colors = new Array(V + 1).fill(-1);
    let isBipartite = true;

    for (let i = 0; i < E; i++) {
      const [start, end] = input().split(" ").map(Number);

      graph[start].push(end);
      graph[end].push(start);
    }

    const bfs = (node, color) => {
      const queue = new Queue();

      queue.enqueue([node, color]);
      colors[node] = color;

      while (!queue.isEmpty()) {
        const [current, color] = queue.dequeue();

        for (let i = 0; i < graph[current].length; i++) {
          const next = graph[current][i];

          if (!visited[next]) {
            queue.enqueue([next, !color]);
            visited[next] = true;
            colors[next] = !color;
          } else if (colors[current] === colors[next]) {
            isBipartite = false;
            return;
          }
        }
      }
    };

    for (let i = 1; i <= V; i++) {
      if (!visited[i] && isBipartite) {
        bfs(i, true);
      }
    }

    if (isBipartite) {
      result.push("YES");
    } else {
      result.push("NO");
    }
  }

  return result.join("\n");
};

console.log(solution());
