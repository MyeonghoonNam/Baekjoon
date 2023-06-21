const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 42`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 3차 해결
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
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.size === 0) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = null;
    }

    this.size -= 1;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const [A, B] = input().split(" ").map(Number);

  const bfs = () => {
    const queue = new Queue();
    queue.enqueue([A, 1]);

    while (!queue.isEmpty()) {
      const [value, count] = queue.dequeue();

      if (value === B) return count;

      if (value * 2 <= B) {
        queue.enqueue([value * 2, count + 1]);
      }

      if (value * 10 + 1 <= B) {
        queue.enqueue([value * 10 + 1, count + 1]);
      }
    }

    return -1;
  };

  const result = bfs();

  return result;
};

console.log(solution());

// 2차 해결
// const solution = () => {
//   let [A, B] = input().split(" ").map(Number);
//   let result = 1;

//   while (true) {
//     if (A > B) {
//       return -1;
//     }

//     if (A === B) {
//       return result;
//     }

//     if (B % 2 === 0) {
//       B /= 2;
//     } else if (B % 10 === 1) {
//       B = parseInt(B / 10);
//     } else {
//       return -1;
//     }

//     result += 1;
//   }
// };

// console.log(solution());

// 1차 해결
// const solution = () => {
//   let [A, B] = input().split(" ").map(Number);
//   let result = 1;

//   while (true) {
//     if (A > B) return -1;

//     if (A === B) return result;

//     if (B % 2 === 0) {
//       B /= 2;
//     } else if (B % 10 === 1) {
//       B = parseInt(B / 10);
//     } else {
//       return -1;
//     }

//     result++;
//   }
// };

// console.log(solution());
