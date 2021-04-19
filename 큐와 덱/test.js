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

  push(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else if (this.head === this.tail) {
      this.head.next = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }
  }

  pop() {
    if (this.length === 0) {
      return -1;
    }

    if (this.head === this.tail) {
      this.tail == null;
    }

    if (this.head !== null) {
      const popNode = this.head;

      this.head = popNode.next;
      this.length--;

      return popNode.value;
    }
  }

  size() {
    return this.length;
  }

  empty() {
    if (this.length === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  front() {
    if (this.length === 0) {
      return -1;
    } else {
      return this.head.value;
    }
  }

  back() {
    if (this.length === 0) {
      return -1;
    } else {
      return this.tail.value;
    }
  }
}

const input = [
  ['15'],
  ['push', '1'],
  ['push', '2'],
  ['front'],
  ['back'],
  ['size'],
  ['empty'],
  ['pop'],
  ['pop'],
  ['pop'],
  ['size'],
  ['empty'],
  ['pop'],
  ['push', '3'],
  ['empty'],
  ['front'],
];

const N = parseInt(input[0][0]);
input.shift();

const queue = new Queue();
const result = [];
for (let i = 0; i < N; i++) {
  const method = input[i][0];
  switch (method) {
    case 'push':
      queue.push(parseInt(input[i][1]));
      break;
    case 'pop':
      result.push(queue.pop());
      break;
    case 'size':
      result.push(queue.size());
      break;
    case 'empty':
      result.push(queue.empty());
      break;
    case 'front':
      result.push(queue.front());
      break;
    case 'back':
      result.push(queue.back());
      break;
    default:
      console.log('잘못된 명령입니다.');
  }
}

console.log(result.join('\n'));
