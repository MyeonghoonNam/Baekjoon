'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
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

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value) {
    this.data = value;
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

    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  pop() {
    if (this.empty()) return -1;

    const popNode = this.head;

    if (this.size() === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.length--;

    return popNode.data;
  }

  size() {
    return this.length;
  }

  empty() {
    return this.length === 0 ? 1 : 0;
  }

  front() {
    if (this.empty()) return -1;

    return this.head.data;
  }

  back() {
    if (this.empty()) return -1;

    return this.tail.data;
  }
}

console.log(Solution());

function Solution() {
  const N = Number(input());

  const queue = new Queue();
  const result = [];

  for (let i = 0; i < N; i++) {
    const mod = input().split(' ');

    switch (mod[0]) {
      case 'push':
        queue.push(Number(mod[1]));
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
    }
  }

  return result.join('\n');
}
