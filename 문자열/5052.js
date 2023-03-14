const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3
91125426
911
97625999
5
113
12340
123440
12345
98346`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 문자열 정렬을 활용한 풀이

// const solution = () => {
//   const result = [];
//   let T = input(Number);

//   while (T--) {
//     const N = input(Number);
//     const numbers = [];
//     let isConsistence = true;

//     for (let i = 0; i < N; i++) {
//       numbers.push(input());
//     }

//     numbers.sort();

//     for (let i = 1; i < N; i++) {
//       const prefixLength = numbers[i - 1].length;

//       if (numbers[i].slice(0, prefixLength) === numbers[i - 1]) {
//         isConsistence = false;
//         break;
//       }
//     }

//     isConsistence ? result.push("YES") : result.push("NO");
//   }

//   return result.join("\n");
// };

// 트라이 자료구조를 활용한 풀이
class Node {
  constructor(value = "") {
    this.value = value;
    this.isEnd = false;
    this.child = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(value) {
    let currentNode = this.root;

    for (let i = 0; i < value.length; i++) {
      if (!currentNode.child[value[i]]) {
        currentNode.child[value[i]] = new Node(currentNode.value + value[i]);
      }

      currentNode = currentNode.child[value[i]];
    }

    currentNode.isEnd = true;
  }

  hasPrefix(value) {
    let currentNode = this.root;

    for (let i = 0; i < value.length; i++) {
      if (currentNode.child[value[i]]) {
        currentNode = currentNode.child[value[i]];

        if (Object.keys(currentNode.child).length && currentNode.isEnd) {
          return true;
        }
      } else {
        return false;
      }
    }
  }
}

const solution = () => {
  const result = [];
  let T = input(Number);

  while (T--) {
    const N = input(Number);
    const trie = new Trie();
    const numbers = [];

    for (let i = 0; i < N; i++) {
      numbers.push(input());
    }

    for (let i = 0; i < N; i++) {
      trie.insert(numbers[i]);
    }

    let isConsistence = true;

    for (let i = 0; i < N; i++) {
      if (trie.hasPrefix(numbers[i])) {
        isConsistence = false;
        break;
      }
    }

    isConsistence ? result.push("YES") : result.push("NO");
  }

  return result.join("\n");
};

console.log(solution());
