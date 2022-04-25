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
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.size === 0) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = null;
    }

    this.size -= 1;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 3 2 1
1 2
1 3
1 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * N, M => 도시와 단방향 도로의 수
 * 도로의 가중치 = 1
 * 출발 도시 X에서 같은 도시 X로 가는 최단 거리 = 0
 *
 * 요구사항
 * 1. 특정 도시 X로부터 출발하여 도달가능한 도시 중 최단거리가 K인 모든 도시들의 번호를 한 줄에 하나씩 오름차순으로 출력하기
 * 2. 도달가능한 도시 중 최단거리가 K인 도시가 없다면 -1로 출력
 *
 * 1. 단방향 그래프 구현
 * 2. 특정 도시 X를 시작노드로 하여 bfs구현을 위해 큐 자료구조 활용
 * 3. 거리를 기록하는 1차원 배열을 토대로 최단거리 갱신한다.
 *  3-1. 도달가능한 다음 노드의 최단거리 = 현재 노드의 최단거리 + 1
 */

const solution = () => {
  const [N, M, K, X] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());
  const distance = new Array(N + 1).fill(-1);
  distance[X] = 0;

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);
    graph[start].push(end);
  }

  const queue = new Queue();
  queue.enqueue(X);

  while (!queue.isEmpty()) {
    const current_vertex = queue.dequeue();

    graph[current_vertex].forEach((next_vertex) => {
      if (distance[next_vertex] === -1) {
        queue.enqueue(next_vertex);
        distance[next_vertex] = distance[current_vertex] + 1;
      }
    });
  }

  const result = [];
  let flag = false;

  for (let i = 1; i <= N; i++) {
    if (distance[i] === K) {
      result.push(i);
      flag = true;
    }
  }

  return flag ? result.join("\n") : -1;
};

console.log(solution());
