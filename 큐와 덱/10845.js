const fs = require('fs');
const stdin = (process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString()
  : `15
push 1
push 2
front
back
size
empty
pop
pop
pop
size
empty
pop
push 3
empty
front`
).split('\n');

class Queue {
  constructor() {
    this.storage = [];
  }

  push(value) {
    this.storage.push(value);
  }

  pop() {
    return this.storage.length ? this.storage.shift() : -1;
  }

  size() {
    return this.storage.length;
  }

  empty() {
    return this.storage.length ? 0 : 1;
  }

  front() {
    return this.storage.length ? this.storage[0] : -1;
  }

  back() {
    return this.storage.length ? this.storage[this.storage.length - 1] : -1;
  }
}

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const N = Number(input());

  const q = new Queue();
  const result = [];

  for (let i = 0; i < N; i++) {
    const cmd = input().split(' ');

    switch (cmd[0]) {
      case 'push':
        q.push(cmd[1]);
        break;
      case 'pop':
        result.push(q.pop());
        break;
      case 'size':
        result.push(q.size());
        break;
      case 'empty':
        result.push(q.empty());
        break;
      case 'front':
        result.push(q.front());
        break;
      case 'back':
        result.push(q.back());
        break;
      default:
        break;
    }
  }
  console.log(result.join('\n'));
}
