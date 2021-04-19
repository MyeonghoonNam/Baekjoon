class Queue {
  constructor() {
    this.queue = [];
  }

  push(value) {
    this.queue.push(value);
  }

  pop() {
    if (this.queue.length === 0) {
      return -1;
    }

    return this.queue.shift();
  }

  size() {
    return this.queue.length;
  }

  empty() {
    if (this.queue.length === 0) {
      return 1;
    }

    return 0;
  }

  front() {
    if (this.queue.length === 0) {
      return -1;
    }

    return this.queue[0];
  }

  back() {
    if (this.queue.length === 0) {
      return -1;
    }

    return this.queue[this.queue.length - 1];
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
