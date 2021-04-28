// class Node {
//   constructor(value, priority) {
//     this.value = value;
//     this.priority = priority;
//   }
// }

// class PriorityQueue {
//   constructor() {
//     this.queue = [];
//   }

//   enqueue(value, priority) {
//     const newNode = new Node(value, priority);
//     let flag = false;

//     for (let i = 0; i < this.queue.length; i++) {
//       if (this.queue[i].priority > newNode.priority) {
//         this.queue.splice(i, 0, newNode);
//         flag = true;
//         break;
//       }
//     }

//     if (!flag) {
//       this.queue.push(newNode);
//     }
//   }

//   dequeue() {
//     if (this.queue.length === 0) {
//       return new Error('큐에 데이터가 없습니다.');
//     }

//     return this.queue.shift();
//   }

//   empty() {
//     if (this.queue.length === 0) {
//       return 1;
//     } else {
//       return 0;
//     }
//   }
// }

// const input = ['5 17'];

// console.log(Solution(input));

// function Solution(input) {
//   const [N, K] = input[0].split(' ').map(Number);

//   const q = new PriorityQueue();
//   const visited = new Array(100001).fill(false);

//   q.enqueue(N, 0);
//   visited[N] = true;

//   while (!q.empty()) {
//     const current = q.dequeue();

//     const pos = current.value;
//     const time = current.priority;

//     if (pos === K) {
//       return time;
//     }

//     if (pos * 2 <= 100000 && !visited[pos * 2]) {
//       q.enqueue(pos * 2, time);
//       visited[pos * 2] = true;
//     }

//     if (pos + 1 <= 100000 && !visited[pos + 1]) {
//       q.enqueue(pos + 1, time + 1);
//       visited[pos + 1] = true;
//     }

//     if (pos - 1 >= 0 && !visited[pos - 1]) {
//       q.enqueue(pos - 1, time + 1);
//       visited[pos - 1] = true;
//     }

//     console.log(q.queue);
//   }
// }

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let answer = 100001;
let inf = 100001;
let N = 0;
let K = 0;
let costs = new Array(100001).fill(inf);

rl.on('line', function (line) {
  [N, K] = line.split(' ').map((num) => +num);
  rl.close();
})
.on('close', function () {
  let queue = [[N, 0]];

  while (queue.length) {
    let [num, cnt] = queue.shift();

    if (costs[num] < cnt) continue;

    if (num === K) {
      answer = cnt;
      break;
    }

    let x1 = num - 1;
    let x2 = num + 1;
    let x3 = num * 2;

    if (0 <= x1 && costs[x1] > cnt + 1) {
      costs[x1] = cnt + 1;
      queue.push([x1, cnt + 1]);
    }

    if (x2 <= inf && costs[x2] > cnt + 1) {
      costs[x2] = cnt + 1;
      queue.push([x2, cnt + 1]);
    }

    if (x3 <= inf && costs[x3] > cnt) {
      costs[x3] = cnt;
      queue.push([x3, cnt]);
    }
  }

  console.log(answer);
  process.exit();
});
