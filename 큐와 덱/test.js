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
}

const input = '7 3';
const [N, K] = input.split(' ');

const queue = new Queue();

for (let i = 1; i <= N; i++) {
  queue.enqueue(i);
}

let result = '<';
while (queue.length > 1) {
  for (let i = 0; i < K - 1; i++) {
    const front = queue.front();
    queue.enqueue(front);
    queue.dequeue();
  }

  const remove = queue.dequeue();
  result += `${remove}, `;
}

result += `${queue.dequeue()}>`;

console.log(result);
