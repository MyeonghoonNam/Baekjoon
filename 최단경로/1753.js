const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 4차 해결
class MinHeap {
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
  const [V, E] = input().split(" ").map(Number);
  const K = Number(input());
  const graph = Array.from(new Array(V + 1), () => []);
  const distance = new Array(V + 1).fill(Infinity);

  for (let i = 0; i < E; i++) {
    const [start, end, cost] = input().split(" ").map(Number);

    graph[start].push({ node: end, cost });
  }

  const dijkstra = () => {
    const queue = new MinHeap();

    queue.insert({ node: K, cost: 0 });
    distance[K] = 0;

    while (!queue.isEmpty()) {
      const { node: start, cost: startCost } = queue.pop();

      if (distance[start] < startCost) continue;

      for (let i = 0; i < graph[start].length; i++) {
        const { node: end, cost: endCost } = graph[start][i];
        const totalCost = startCost + endCost;

        if (totalCost < distance[end]) {
          queue.insert({ node: end, cost: totalCost });
          distance[end] = totalCost;
        }
      }
    }
  };

  dijkstra();

  const result = [];

  for (let i = 1; i <= V; i++) {
    if (distance[i] === Infinity) {
      result.push("INF");
    } else {
      result.push(distance[i]);
    }
  }

  return result.join("\n");
};

console.log(solution());

// 3차 해결
// class MinHeap {
//   constructor() {
//     this.heap = [];
//     this.size = 0;
//   }

//   insert(value) {
//     this.heap.push(value);
//     this.size += 1;
//     this.moveUp();
//   }

//   pop() {
//     if (this.isEmpty()) return;

//     if (this.size === 1) {
//       this.size -= 1;
//       return this.heap.pop();
//     }

//     const minValue = this.heap[0];

//     this.heap[0] = this.heap.pop();
//     this.size -= 1;
//     this.moveDown();

//     return minValue;
//   }

//   moveUp() {
//     let currentIndex = this.size - 1;

//     while (currentIndex > 0) {
//       const parentIndex = parseInt((currentIndex - 1) / 2);

//       if (this.heap[parentIndex].cost <= this.heap[currentIndex].cost) break;

//       this.swap(parentIndex, currentIndex);
//       currentIndex = parentIndex;
//     }
//   }

//   moveDown(currentIndex = 0) {
//     const leftChildIndex = currentIndex * 2 + 1;
//     const rightChildIndex = currentIndex * 2 + 2;
//     let minIndex = currentIndex;

//     while (
//       leftChildIndex < this.size &&
//       this.heap[leftChildIndex].cost < this.heap[minIndex].cost
//     ) {
//       minIndex = leftChildIndex;
//     }

//     while (
//       rightChildIndex < this.size &&
//       this.heap[rightChildIndex].cost < this.heap[minIndex].cost
//     ) {
//       minIndex = rightChildIndex;
//     }

//     if (minIndex !== currentIndex) {
//       this.swap(minIndex, currentIndex);
//       this.moveDown(minIndex);
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
//   const [V, E] = input().split(" ").map(Number);
//   const K = Number(input());
//   const graph = Array.from(new Array(V + 1), () => []);
//   const distance = new Array(V + 1).fill(Infinity);

//   for (let i = 0; i < E; i++) {
//     const [u, v, w] = input().split(" ").map(Number);
//     graph[u].push({ node: v, cost: w });
//   }

//   const dijkstra = (start) => {
//     const queue = new MinHeap();

//     queue.insert({ node: start, cost: 0 });
//     distance[start] = 0;

//     while (!queue.isEmpty()) {
//       const current = queue.pop();

//       if (distance[current.node] < current.cost) continue;

//       for (let i = 0; i < graph[current.node].length; i++) {
//         const next = graph[current.node][i];
//         const totalCost = current.cost + next.cost;

//         if (totalCost < distance[next.node]) {
//           queue.insert({ node: next.node, cost: totalCost });
//           distance[next.node] = totalCost;
//         }
//       }
//     }
//   };

//   dijkstra(K);

//   const result = [];

//   for (let i = 1; i <= V; i++) {
//     if (distance[i] === Infinity) {
//       result.push("INF");
//     } else {
//       result.push(distance[i]);
//     }
//   }

//   return result.join("\n");
// };

// console.log(solution());

// 2차 해결
// class MinHeap {
//   constructor() {
//     this.heap = [];
//     this.heapSize = 0;
//   }

//   insert(value) {
//     this.heap.push(value);
//     this.heapSize++;
//     this.moveUp();
//   }

//   pop() {
//     if (this.isEmpty()) return;

//     if (this.heapSize === 1) {
//       this.heapSize--;
//       return this.heap.pop();
//     }

//     const popNode = this.heap[0];
//     this.heap[0] = this.heap.pop();
//     this.heapSize--;
//     this.moveDown();

//     return popNode;
//   }

//   moveUp() {
//     let curIdx = this.heapSize - 1;

//     while (curIdx > 0) {
//       const parentIdx = Math.floor((curIdx - 1) / 2);

//       if (this.heap[parentIdx].cost <= this.heap[curIdx].cost) break;

//       [this.heap[parentIdx], this.heap[curIdx]] = [
//         this.heap[curIdx],
//         this.heap[parentIdx],
//       ];
//       curIdx = parentIdx;
//     }
//   }

//   moveDown(curIdx = 0) {
//     const leftChildIdx = curIdx * 2 + 1;
//     const rightChildIdx = curIdx * 2 + 2;
//     const leftChildCost = this.heap[leftChildIdx]?.cost;
//     const rightChildCost = this.heap[rightChildIdx]?.cost;
//     let minIdx = curIdx;
//     const minCost = this.heap[minIdx].cost;

//     if (leftChildIdx < this.heapSize && leftChildCost < minCost) {
//       minIdx = leftChildIdx;
//     }

//     if (rightChildIdx < this.heapSize && rightChildCost < minCost) {
//       minIdx = rightChildIdx;
//     }

//     if (minIdx !== curIdx) {
//       [this.heap[minIdx], this.heap[curIdx]] = [
//         this.heap[curIdx],
//         this.heap[minIdx],
//       ];
//       this.moveDown(minIdx);
//     }
//   }

//   isEmpty() {
//     return this.heapSize === 0 ? true : false;
//   }
// }

// const solution = () => {
//   const [V, E] = input().split(" ").map(Number);
//   const startNode = Number(input());
//   const graph = Array.from(new Array(V + 1), () => new Array());
//   const distance = new Array(V + 1).fill(Infinity);

//   for (let i = 0; i < E; i++) {
//     const [startPoint, destination, dist] = input().split(" ").map(Number);

//     // 배열을 대입(ex) [destination, dist])하는 것보다 아래와 같은 객체를 다루는게 시간 복잡도 면에서 유리한 판정이 나옴
//     graph[startPoint].push({ destination, dist });
//   }

//   const dijkstra = (startNode) => {
//     const queue = new MinHeap();
//     queue.insert({ node: startNode, cost: 0 });
//     distance[startNode] = 0;

//     while (!queue.isEmpty()) {
//       const { node, cost } = queue.pop();

//       if (distance[node] < cost) continue;

//       graph[node].forEach(({ destination, dist }) => {
//         const totalCost = cost + dist;

//         if (totalCost < distance[destination]) {
//           queue.insert({ node: destination, cost: totalCost });
//           distance[destination] = totalCost;
//         }
//       });
//     }
//   };

//   dijkstra(startNode);

//   const result = [];
//   for (let i = 1; i <= V; i++) {
//     const cost = distance[i];

//     if (cost === Infinity) {
//       result.push("INF");
//     } else {
//       result.push(cost);
//     }
//   }

//   return result.join("\n");
// };

// console.log(solution());

// 1차 해결
// class MinHeap {
//   constructor() {
//     this.heap = [];
//     this.heapSize = 0;
//   }

//   insert(value) {
//     this.heap.push(value);
//     this.heapSize++;
//     this.moveUp();
//   }

//   pop() {
//     if (this.isEmpty()) return;

//     if (this.heapSize === 1) {
//       this.heapSize--;
//       return this.heap.pop();
//     }

//     const popNode = this.heap[0];
//     this.heap[0] = this.heap.pop();
//     this.heapSize--;
//     this.moveDown();

//     return popNode;
//   }

//   moveUp() {
//     let curIdx = this.heapSize - 1;

//     while (curIdx > 0) {
//       const parentIdx = Math.floor((curIdx - 1) / 2);

//       if (this.heap[parentIdx].cost <= this.heap[curIdx].cost) break;

//       [this.heap[parentIdx], this.heap[curIdx]] = [
//         this.heap[curIdx],
//         this.heap[parentIdx],
//       ];
//       curIdx = parentIdx;
//     }
//   }

//   moveDown(curIdx = 0) {
//     const leftChildIdx = curIdx * 2 + 1;
//     const rightChildIdx = curIdx * 2 + 2;
//     const leftChildCost = this.heap[leftChildIdx]?.cost;
//     const rightChildCost = this.heap[rightChildIdx]?.cost;
//     let minIdx = curIdx;
//     const minCost = this.heap[minIdx].cost;

//     if (leftChildIdx < this.heapSize && leftChildCost < minCost) {
//       minIdx = leftChildIdx;
//     }

//     if (rightChildIdx < this.heapSize && rightChildCost < minCost) {
//       minIdx = rightChildIdx;
//     }

//     if (minIdx !== curIdx) {
//       [this.heap[minIdx], this.heap[curIdx]] = [
//         this.heap[curIdx],
//         this.heap[minIdx],
//       ];
//       this.moveDown(minIdx);
//     }
//   }

//   isEmpty() {
//     return this.heapSize === 0 ? true : false;
//   }
// }

// const solution = () => {
//   const [V, E] = input().split(" ").map(Number);
//   const startNode = Number(input());
//   const graph = Array.from(new Array(V + 1), () => new Array());
//   const distance = new Array(V + 1).fill(Infinity);

//   for (let i = 0; i < E; i++) {
//     const [startPoint, destination, dist] = input().split(" ").map(Number);

//     graph[startPoint].push({ destination, dist });
//   }

//   const dijkstra = (startNode) => {
//     const queue = new MinHeap();
//     queue.insert({ node: startNode, cost: 0 });
//     distance[startNode] = 0;

//     while (!queue.isEmpty()) {
//       const { node, cost } = queue.pop();

//       if (distance[node] < cost) continue;

//       graph[node].forEach(({ destination, dist }) => {
//         const totalCost = cost + dist;

//         if (totalCost < distance[destination]) {
//           queue.insert({ node: destination, cost: totalCost });
//           distance[destination] = totalCost;
//         }
//       });
//     }
//   };

//   dijkstra(startNode);

//   const result = [];
//   for (let i = 1; i <= V; i++) {
//     const cost = distance[i];

//     if (cost === Infinity) {
//       result.push("INF");
//     } else {
//       result.push(cost);
//     }
//   }

//   return result.join("\n");
// };

// console.log(solution());
