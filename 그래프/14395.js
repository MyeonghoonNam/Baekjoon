const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 1`
).split("\n");

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
    this.head = this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.isEmpty()) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size -= 1;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const [S, T] = input().split(" ").map(Number);
  const operator = ["*", "+", "-", "/"];
  const visited = new Set();
  let isFound = false;
  let result = "";

  if (S === T) return 0;

  const bfs = () => {
    const queue = new Queue();

    queue.enqueue([S, ""]);
    visited.add(S);

    while (!queue.isEmpty()) {
      let [current, oper] = queue.dequeue();

      if (current === T) {
        result = oper;
        isFound = true;

        return;
      }

      for (let i = 0; i < operator.length; i++) {
        const mod = operator[i];
        let number = current;

        switch (mod) {
          case "*":
            number *= number;
            break;
          case "+":
            number += number;
            break;
          case "-":
            number -= number;
            break;
          case "/":
            if (current !== 0) {
              number /= number;
            }

            break;
        }

        if (!visited.has(number)) {
          visited.add(number);
          queue.enqueue([number, oper + mod]);
        }
      }
    }
  };

  bfs();

  if (!isFound) return -1;

  return result;
};

console.log(solution());
