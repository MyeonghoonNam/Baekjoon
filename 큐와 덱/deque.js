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
