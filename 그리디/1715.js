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

    const pop_value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.size -= 1;
    this.moveDown();

    return pop_value;
  }

  moveUp() {
    let current_index = this.heap.length - 1;

    while (current_index > 0) {
      const parent_index = parseInt((current_index - 1) / 2);

      if (this.heap[parent_index] <= this.heap[current_index]) break;

      this.swap(parent_index, current_index);
      current_index = parent_index;
    }
  }

  moveDown(current_index = 0) {
    const left_child = current_index * 2 + 1;
    const right_child = current_index * 2 + 2;
    let min_index = current_index;

    if (
      left_child < this.heap.length &&
      this.heap[left_child] < this.heap[min_index]
    ) {
      min_index = left_child;
    }

    if (
      right_child < this.heap.length &&
      this.heap[right_child] < this.heap[min_index]
    ) {
      min_index = right_child;
    }

    if (min_index !== current_index) {
      this.swap(min_index, current_index);
      this.moveDown(min_index);
    }
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
10
20
40`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항 : N개의 숫자 카드 묶음의 각각의 크기에서 최소한 몇 번의 비교가 필요한지 도출
 *
 * 정렬된 카드 묶음에서 카드를 합칠 때에 가장 작은 요소들 끼리 합쳐나가면 최소의 비교가 가능하다.
 * 그러므로 합쳐진 카드 역시 남은 카드보다 크기가 크다면 우선순위가 뒤로 밀려야 하므로 우선순위큐(최소힙)를 활용하여 문제를 해결할 수 있다.
 */

const solution = () => {
  const N = Number(input());
  const cards = new PriorityQueue();
  let result = 0;

  for (let i = 0; i < N; i++) {
    cards.insert(Number(input()));
  }

  if (N === 1) {
    return 0;
  }

  while (!cards.isEmpty()) {
    const first_card = cards.pop();
    const second_card = cards.pop() ?? 0;
    const sum = first_card + second_card;

    if (second_card !== 0) {
      cards.insert(sum);
      result += sum;
    }
  }

  return result;
};

console.log(solution());
