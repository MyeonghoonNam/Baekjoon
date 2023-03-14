const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
2 KIWI BANANA
2 KIWI APPLE
2 APPLE APPLE
3 APPLE BANANA KIWI`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value = "") {
    this.value = value;
    this.child = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
    this.structure = "";
  }

  insert(value) {
    let currentNode = this.root;

    for (let i = 0; i < value.length; i++) {
      if (!currentNode.child[value[i]]) {
        currentNode.child[value[i]] = new Node(currentNode.value + value[i]);
      }

      currentNode = currentNode.child[value[i]];
    }
  }

  setStructure(currentNode, deps) {
    for (const child of Object.keys(currentNode.child).sort()) {
      this.structure += "--".repeat(deps) + child + "\n";
      this.setStructure(currentNode.child[child], deps + 1);
    }
  }

  getStructure() {
    this.setStructure(this.root, 0);

    return this.structure;
  }
}

const solution = () => {
  const N = Number(input());
  const trie = new Trie();

  for (let i = 0; i < N; i++) {
    const [_, ...food] = input().split(" ");

    trie.insert(food);
  }

  const result = trie.getStructure();

  return result;
};

console.log(solution());
