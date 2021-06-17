'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `22
front
back
pop_front
pop_back
push_front 1
front
pop_back
push_back 2
back
pop_front
push_front 10
push_front 333
front
back
pop_back
pop_back
push_back 20
push_back 1234
front
back
pop_back
pop_back`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// 이중 연결 리스트를 활용한 구현
class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 덱의 맨 앞에 데이터 삽입
  push_front(value) {
    const newNode = new Node(value);

    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;

      this.head = newNode;
    }

    this.length++;
  }

  // 덱의 맨 뒤에 데이터 삽입
  push_back(value) {
    const newNode = new Node(value);

    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;

      this.tail = newNode;
    }

    this.length++;
  }

  // 덱의 맨 앞 데이터 삭제
  pop_front() {
    if (this.empty()) return -1;

    const popNode = this.head;

    if (this.size() === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.length--;

    return popNode.value;
  }

  // 덱의 맨 뒤 데이터 삭제
  pop_back() {
    if (this.empty()) return -1;

    const popNode = this.tail;

    if (this.size() === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;

    return popNode.value;
  }

  // 덱의 크기
  size() {
    return this.length;
  }

  // 덱이 비었는지에 대한 여부
  empty() {
    return this.length === 0 ? 1 : 0;
  }

  // 덱의 가장 앞 데이터 조회
  front() {
    return this.empty() ? -1 : this.head.value;
  }

  // 덱의 가장 뒤 데이터 조회
  back() {
    return this.empty() ? -1 : this.tail.value;
  }
}

console.log(Solution());

function Solution() {
  const N = Number(input());

  const deque = new Deque();
  const result = [];

  for (let i = 0; i < N; i++) {
    const mod = input().split(' ');

    switch (mod[0]) {
      case 'push_front':
        deque.push_front(Number(mod[1]));
        break;
      case 'push_back':
        deque.push_back(Number(mod[1]));
        break;
      case 'pop_front':
        result.push(deque.pop_front());
        break;
      case 'pop_back':
        result.push(deque.pop_back());
        break;
      case 'size':
        result.push(deque.size());
        break;
      case 'empty':
        result.push(deque.empty());
        break;
      case 'front':
        result.push(deque.front());
        break;
      case 'back':
        result.push(deque.back());
        break;
    }
  }

  return result.join('\n');
}
