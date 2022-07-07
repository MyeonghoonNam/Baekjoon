const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `15
push_back 1
push_front 2
front
back
size
empty
pop_front
pop_back
pop_front
size
empty
pop_back
push_front 3
empty
front`
).split("\n");

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

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push_front(value) {
    const new_node = new Node(value);

    if (this.empty()) {
      this.head = this.tail = new_node;
    } else {
      new_node.next = this.head;
      this.head.prev = new_node;
      this.head = new_node;
    }

    this.length++;
  }

  push_back(value) {
    const new_node = new Node(value);

    if (this.empty()) {
      this.head = this.tail = new_node;
    } else {
      new_node.prev = this.tail;
      this.tail.next = new_node;
      this.tail = new_node;
    }

    this.length++;
  }

  pop_front() {
    if (this.empty()) return -1;

    const pop_node = this.head;

    if (this.size() === 1) {
      this.head = this.tail = null;
    } else {
      this.head = pop_node.next;
      this.head.prev = null;
    }

    this.length--;
    return pop_node.value;
  }

  pop_back() {
    if (this.empty()) return -1;

    const pop_node = this.tail;

    if (this.size() === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = pop_node.prev;
      this.tail.next = null;
    }

    this.length--;
    return pop_node.value;
  }

  size() {
    return this.length;
  }

  empty() {
    return this.size() === 0 ? true : false;
  }

  front() {
    return this.empty() ? -1 : this.head.value;
  }

  back() {
    return this.empty() ? -1 : this.tail.value;
  }
}

const solution = () => {
  let N = Number(input());
  const deque = new Deque();
  const result = [];

  while (N--) {
    const [mod, value] = input().split(" ");

    switch (mod) {
      case "push_front":
        deque.push_front(Number(value));
        break;
      case "push_back":
        deque.push_back(Number(value));
        break;
      case "pop_front":
        const front_pop_value = deque.pop_front();
        result.push(front_pop_value);
        break;
      case "pop_back":
        const back_pop_value = deque.pop_back();
        result.push(back_pop_value);
        break;
      case "size":
        const size = deque.size();
        result.push(size);
        break;
      case "empty":
        const flag = deque.empty();

        if (flag) {
          result.push(1);
        } else {
          result.push(0);
        }

        break;
      case "front":
        const front_value = deque.front();
        result.push(front_value);
        break;
      case "back":
        const back_value = deque.back();
        result.push(back_value);
        break;
    }
  }

  return result.join("\n");
};

console.log(solution());
