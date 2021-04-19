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
    this.length = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (!this.head) {
      return null;
    }

    if (this.head === this.tail) {
      this.tail = null;
    }

    const pointer = this.head;

    this.head = this.head.next;
    this.length--;

    return pointer.value;
  }

  front() {
    return this.head.value;
  }

  empty() {
    if (this.legth === 0) {
      return 1;
    } else {
      return 0;
    }
  }
}

const input = [
  [3],
  [1, 0],
  [5],
  [4, 2],
  [1, 2, 3, 4],
  [6, 0],
  [1, 1, 9, 1, 1, 1],
];

const T = input[0][0];

const N = [];
const M = [];
const priorty = [];

for (let i = 1; i < T * 2; i += 2) {
  N.push(input[i][0]);
  M.push(input[i][1]);
}

for (let i = 2; i <= T * 2; i += 2) {
  priorty.push(input[i]);
}

for (let i = 0; i < T; i++) {
  const queue = new Queue();

  for (let j = 0; j < N[i]; j++) {
    queue.enqueue(priorty[i][j]);
  }

  const temp = M[i];
  while (!queue.empty()) {}
}
