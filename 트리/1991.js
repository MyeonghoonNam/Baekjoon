const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7
A B C
B D .
C E F
E . .
F . G
D . .
G . .`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.traversal = '';
  }

  insert(value, left, right) {
    if (this.root === null) {
      this.root = new Node(value);
      if (left !== '.') this.root.left = new Node(left);
      if (right !== '.') this.root.right = new Node(right);
    } else {
      this.search(this.root, value, left, right);
    }
  }

  search(root, value, left, right) {
    if (!root) {
      return;
    } else if (root.value === value) {
      if (left !== '.') root.left = new Node(left);
      if (right !== '.') root.right = new Node(right);
    } else {
      this.search(root.left, value, left, right);
      this.search(root.right, value, left, right);
    }
  }

  preOrder(root = this.root) {
    if (!root) return;

    this.traversal += root.value;
    this.preOrder(root.left);
    this.preOrder(root.right);
  }

  inOrder(root = this.root) {
    if (!root) return;

    this.inOrder(root.left);
    this.traversal += root.value;
    this.inOrder(root.right);
  }

  postOrder(root = this.root) {
    if (!root) return;

    this.postOrder(root.left);
    this.postOrder(root.right);
    this.traversal += root.value;
  }
}

const N = Number(input());
const tree = new Tree();

for (let i = 0; i < N; i++) {
  const [value, left, right] = input().split(' ');
  tree.insert(value, left, right);
}

tree.preOrder();
console.log(tree.traversal);
tree.traversal = '';

tree.inOrder();
console.log(tree.traversal);
tree.traversal = '';

tree.postOrder();
console.log(tree.traversal);
tree.traversal = '';
