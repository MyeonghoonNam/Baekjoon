class PriorityQueue {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.size++;
    this.moveUp();
  }

  pop() {
    if (this.size === 0) return;
    if (this.size === 1) {
      this.size--;
      return this.heap.pop();
    }

    const pop_node = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.size--;
    this.moveDown();

    return pop_node;
  }

  moveUp() {
    let current_idx = this.size - 1;

    while (current_idx > 0) {
      const parent_idx = parseInt((current_idx - 1) / 2);

      if (this.heap[parent_idx] < this.heap[current_idx]) break;

      this.swap(current_idx, parent_idx);
      current_idx = parent_idx;
    }
  }

  moveDown(current_idx = 0) {
    const leftChild_idx = current_idx * 2 + 1;
    const rightChild_idx = current_idx * 2 + 2;
    let min_idx = current_idx;

    if (
      leftChild_idx < this.size &&
      this.heap[leftChild_idx] < this.heap[min_idx]
    ) {
      min_idx = leftChild_idx;
    }

    if (
      rightChild_idx < this.size &&
      this.heap[rightChild_idx] < this.heap[min_idx]
    ) {
      min_idx = rightChild_idx;
    }

    if (min_idx !== current_idx) {
      this.swap(min_idx, current_idx);
      this.moveDown(min_idx);
    }
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * N개의 숫자로 구분된 각각의 마을에 한 명의 학생이 산다.
 * M개의 단 방향 도로가 마을 사이에 존재하며 도로를 지나는 시간이 존재한다.
 *
 * 요구사항: N명의 학생들 중 파티를 하는 마을을 자신의 마을에서 왕복하는데 시간이 가장 오래 걸리는 학생을 도출
 */
const solution = () => {
  const [N, M, X] = input().split(" ").map(Number);
  const map = Array.from(new Array(N + 1), () => new Array());
  const reverse_map = Array.from(new Array(N + 1), () => new Array());
  // const total_distance = new Array(N + 1).fill(0);

  for (let i = 0; i < M; i++) {
    const [start, end, time] = input().split(" ").map(Number);
    map[start].push({ node: end, time });
    reverse_map[end].push({ node: start, time }); // 단방향 간선 정보를 반대로 지정하여 파티를 참석하는 경우의 최소비용을 구하는 시간복잡도를 개선
  }

  const dijkstra = (map) => {
    const queue = new PriorityQueue();
    queue.insert({ node: X, time: 0 });

    const times = new Array(N + 1).fill(Infinity);
    times[X] = 0;

    while (!queue.isEmpty()) {
      const { node, time } = queue.pop();

      map[node].forEach((destination) => {
        const total_time = time + destination.time;

        if (total_time < times[destination.node]) {
          queue.insert({ node: destination.node, time: total_time });
          times[destination.node] = total_time;
        }
      });
    }

    return times;
  };

  const process = () => {
    const go_times = dijkstra(map);
    const come_times = dijkstra(reverse_map);
    let total_time = 0;

    for (let i = 1; i <= N; i++) {
      if (i === X) continue;

      total_time = Math.max(total_time, go_times[i] + come_times[i]);
    }

    return total_time;
  };

  const result = process();
  return result;
};

console.log(solution());
