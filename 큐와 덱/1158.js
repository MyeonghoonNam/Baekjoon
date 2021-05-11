const fs = require('fs');
const stdin = (process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString()
  : `7 3`
).split('\n');

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
    if (this.length === 0) {
      return;
    }

    if (this.head === this.tail) {
      this.tail = null;
    }

    const pointer = this.head;

    this.head = this.head.next;
    this.length--;

    return pointer.value;
  }

  size() {
    return this.length;
  }
}

const [N, K] = input().split(' ').map(Number);
let result = '<';

Solution();

function Solution() {
  const q = new Queue();

  for (let i = 1; i <= N; i++) {
    q.enqueue(i);
  }

  while (q.size() > 1) {
    for (let i = 0; i < K - 1; i++) {
      const front = q.dequeue();

      q.enqueue(front);
    }

    result += `${q.dequeue()}, `;
  }

  result += `${q.dequeue()}>`;

  console.log(result);
}
