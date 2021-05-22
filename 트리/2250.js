const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `19
1 2 3
2 4 5
3 6 7
4 8 -1
5 9 10
6 11 12
7 13 -1
8 -1 -1
9 14 15
10 -1 -1
11 16 -1
12 -1 -1
13 17 -1
14 -1 -1
15 18 -1
16 -1 -1
17 -1 19
18 -1 -1
19 -1 -1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const MAX = 100001;
const low = new Array(MAX).fill(Number.MAX_SAFE_INTEGER);
const high = new Array(MAX).fill(0);
const node = new Array(MAX).fill(0);
const tree = Array.from(new Array(MAX), () => new Array());
let nodeIdx = 0;
let levelMax = 0;

console.log(Solution());

function Solution() {
  const N = Number(input());

  for (let i = 0; i < N; i++) {
    const [root, left, right] = input().split(' ').map(Number);

    node[root]++;

    if (left !== -1) {
      node[left]++;
    }

    tree[root][0] = left;

    if (right !== -1) {
      node[right]++;
    }

    tree[root][1] = right;
  }

  let root = 0;
  for (let i = 1; i <= N; i++) {
    if (node[i] === 1) {
      root = i;
    }
  }

  nodeIdx = 1;
  DFS(root, 1);

  let width = high[1] - low[1] + 1;
  let level = 1;
  for (let i = 2; i <= levelMax; i++) {
    const temp = high[i] - low[i] + 1;

    if (temp > width) {
      width = temp;
      level = i;
    }
  }

  return `${level} ${width}`;
}

function DFS(root, cnt) {
  if (cnt > levelMax) {
    levelMax++;
  }

  if (tree[root][0] > 0) {
    DFS(tree[root][0], cnt + 1);
  }

  low[cnt] = Math.min(low[cnt], nodeIdx);
  high[cnt] = Math.max(high[cnt], nodeIdx++);

  if (tree[root][1] > 0) {
    DFS(tree[root][1], cnt + 1);
  }
}
