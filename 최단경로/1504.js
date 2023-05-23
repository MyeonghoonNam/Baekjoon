const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 6
1 2 3
2 3 3
3 4 1
1 3 5
2 4 5
1 4 4
2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 무방향 그래프.
 * 1번 정점에서 N번의 정점으로 최단 거리 이동하는데 임의로 주어진 두 정점은 반드시 통과해야 한다.
 * 한번 이동했던 정점과 간선은 다시 이동 가능
 *
 * 요구사항: 1번 정점에서 N번 정점으로 이동할 때 임의로 주어진 두 정점을 반드시 지나는 최단경로 도출
 * 요구사항을 충족하는 경로가 없을 경우 -1을 출력
 */

// 2차 해결
class PriorityQueue {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.size += 1;
    this.moveUp();
  }

  pop() {
    if (this.size === 0) return;

    if (this.size === 1) {
      this.size -= 1;
      return this.heap.pop();
    }

    const popValue = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.size -= 1;
    this.moveDown();

    return popValue;
  }

  moveUp() {
    let currentIndex = this.size - 1;

    while (currentIndex > 0) {
      const parentIndex = parseInt((currentIndex - 1) / 2);

      if (this.heap[parentIndex].cost <= this.heap[currentIndex].cost) break;

      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  moveDown(currentIndex = 0) {
    const leftChildIndex = currentIndex * 2 + 1;
    const rightChildIndex = currentIndex * 2 + 2;
    let minIndex = currentIndex;

    if (
      leftChildIndex < this.size &&
      this.heap[leftChildIndex].cost < this.heap[minIndex].cost
    ) {
      minIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.size &&
      this.heap[rightChildIndex].cost < this.heap[minIndex].cost
    ) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== currentIndex) {
      this.swap(minIndex, currentIndex);
      this.moveDown(minIndex);
    }
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const [N, E] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => []);
  let distance = [];

  for (let i = 0; i < E; i++) {
    const [start, end, cost] = input().split(" ").map(Number);

    graph[start].push({ node: end, cost });
    graph[end].push({ node: start, cost });
  }

  const [V1, V2] = input().split(" ").map(Number);

  const dijkstra = (start) => {
    const queue = new PriorityQueue();

    queue.insert({ node: start, cost: 0 });
    distance = new Array(N + 1).fill(Infinity);
    distance[start] = 0;

    while (!queue.isEmpty()) {
      const { node: currentNode, cost: currentCost } = queue.pop();

      if (distance[currentNode] < currentCost) continue;

      for (let i = 0; i < graph[currentNode].length; i++) {
        const { node: nextNode, cost: nextCost } = graph[currentNode][i];
        const totalCost = currentCost + nextCost;

        if (totalCost < distance[nextNode]) {
          queue.insert({ node: nextNode, cost: totalCost });
          distance[nextNode] = totalCost;
        }
      }
    }
  };

  // 아래 두개중 최솟값이 최종목표
  // 1 => v1 => v2 => N
  // 1 => v2 => v1 => N

  // 1 => v1
  // 1 => v2
  dijkstra(1);
  const oneToV1 = distance[V1];
  const oneToV2 = distance[V2];

  if (oneToV1 === Infinity && oneToV2 === Infinity) return -1;

  // v1 => v2 === v2 => v1 (양방향 간선)
  dijkstra(V1);
  const V1ToV2 = distance[V2];
  const V1ToN = distance[N];

  // v2 => N
  dijkstra(V2);
  const V2ToN = distance[N];

  const result = Math.min(oneToV1 + V1ToV2 + V2ToN, oneToV2 + V1ToV2 + V1ToN);

  return result !== Infinity ? result : -1;
};

console.log(solution());

// 1차 해결
// class PriorityQueue {
//   constructor() {
//     this.heap = [];
//     this.size = 0;
//   }

//   insert(value) {
//     this.heap.push(value);
//     this.size++;
//     this.moveUp();
//   }

//   pop() {
//     if (this.size === 0) return;
//     if (this.size === 1) {
//       this.size--;
//       return this.heap.pop();
//     }

//     const pop_node = this.heap[0];
//     this.heap[0] = this.heap.pop();
//     this.size--;
//     this.moveDown();

//     return pop_node;
//   }

//   moveUp() {
//     let current_idx = this.size - 1;

//     while (current_idx > 0) {
//       const parent_idx = parseInt((current_idx - 1) / 2);

//       if (this.heap[parent_idx] < this.heap[current_idx]) break;
//       this.swap(current_idx, parent_idx);
//       current_idx = parent_idx;
//     }
//   }

//   moveDown(current_idx = 0) {
//     const leftChild_idx = current_idx * 2 + 1;
//     const rightChild_idx = current_idx * 2 + 2;
//     let min_idx = current_idx;

//     if (
//       leftChild_idx < this.size &&
//       this.heap[leftChild_idx] < this.heap[min_idx]
//     ) {
//       min_idx = leftChild_idx;
//     }

//     if (
//       rightChild_idx < this.size &&
//       this.heap[rightChild_idx] < this.heap[min_idx]
//     ) {
//       min_idx = rightChild_idx;
//     }

//     if (min_idx !== current_idx) {
//       this.swap(min_idx, current_idx);
//       this.moveDown(min_idx);
//     }
//   }

//   isEmpty() {
//     return this.size === 0 ? true : false;
//   }

//   swap(a, b) {
//     const temp = this.heap[a];
//     this.heap[a] = this.heap[b];
//     this.heap[b] = temp;
//   }
// }

// const solution = () => {
//   const [N, E] = input().split(" ").map(Number);
//   const map = Array.from(new Array(N + 1), () => new Array());

//   for (let i = 0; i < E; i++) {
//     const [a, b, c] = input().split(" ").map(Number);

//     map[a].push({ node: b, dist: c });
//     map[b].push({ node: a, dist: c });
//   }

//   const dijkstra = (start_node) => {
//     const queue = new PriorityQueue();
//     const distance = new Array(N + 1).fill(Infinity);

//     queue.insert({ node: start_node, dist: 0 });
//     distance[start_node] = 0;

//     while (!queue.isEmpty()) {
//       const { node, dist } = queue.pop();

//       map[node].forEach(({ node: n, dist: d }) => {
//         const total_dist = dist + d;

//         if (total_dist < distance[n]) {
//           queue.insert({ node: n, dist: total_dist });
//           distance[n] = total_dist;
//         }
//       });
//     }

//     return distance;
//   };

//   const process = () => {
//     const [v1, v2] = input().split(" ").map(Number);

//     let distance = dijkstra(1);

//     // 1 => v1, 1 => v2
//     const oneToV1 = distance[v1];
//     const oneToV2 = distance[v2];

//     if (oneToV1 === Infinity && oneToV2 === Infinity) return -1;

//     distance = dijkstra(v1);

//     // v1 => v2 === v2 => v1
//     // v1 => N
//     const v1ToV2 = distance[v2];
//     const v1ToN = distance[N];

//     distance = dijkstra(v2);

//     // v2 => N
//     const v2ToN = distance[N];
//     const result = Math.min(oneToV1 + v1ToV2 + v2ToN, oneToV2 + v1ToV2 + v1ToN);

//     return result !== Infinity ? result : -1;
//   };

//   const result = process();
//   return result;
// };

// console.log(solution());
