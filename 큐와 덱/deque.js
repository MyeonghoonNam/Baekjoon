// 배열 활용하여 구현
class Deque {
  constructor() {
    this.storage = [];
    this.length = 0;
  }

  push_front(value) {
    this.storage.unshift(value);
    this.length++;
  }

  push_back(value) {
    this.storage.push(value);
    this.length++;
  }

  pop_front() {
    this.length--;
    return this.length === 0 ? -1 : this.storage.shift();
  }

  pop_back() {
    this.length--;
    return this.length === 0 ? -1 : this.storage.pop();
  }

  size() {
    return this.length;
  }

  empty() {
    return this.length === 0 ? 1 : 0;
  }

  front() {
    return this.length === 0 ? -1 : this.storage[0];
  }

  back() {
    return this.length === 0 ? -1 : this.storage[this.length - 1];
  }
}

// 이중 연결 리스트 활용하여 구현
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.storage = [];

    this.head = null;
    this.tail = null;

    this.length = 0;
  }

  push_front(value) {
    const newNode = new Node(value);

    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;

      this.storage.unshift(value);
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;

      this.storage.unshift(value);
    }

    this.length++;
  }

  push_back(value) {
    const newNode = new Node(value);

    if (this.empty()) {
      this.head = newNode;
      this.tail = newNode;

      this.storage.push(value);
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;

      this.storage.push(value);
    }

    this.length++;
  }

  pop_front() {
    if (this.empty()) {
      return -1;
    } else {
      const popNode = this.head;

      this.head.prev = null;
      this.head = popNode.next;

      this.storage.shift();
      this.length--;

      return popNode.value;
    }
  }

  pop_back() {
    if (this.empty()) {
      return -1;
    } else {
      const popNode = this.tail;

      this.tail.next = null;
      this.tail = popNode.prev;

      this.storage.pop();
      this.length--;

      return popNode.value;
    }
  }

  size() {
    return this.length;
  }

  empty() {
    return this.length === 0 ? 1 : 0;
  }

  front() {
    return this.head !== null ? this.head.value : -1;
  }

  back() {
    return this.tail !== null ? this.tail.value : -1;
  }
}
