const input = ['5 17'];

let cnt = 0;
let time = -1;

Solution(input);

function Solution(input) {
  const [N, K] = input[0].split(' ').map((el) => parseInt(el));
  const visited = new Array(100001).fill(false);

  Bfs(N, K, visited);
  console.log(`${time}\n${cnt}`);
}

function Bfs(N, K, visited) {
  let q = [];
  q.push(N);
  while (cnt === 0) {
    const temp = [];

    q.forEach((v) => {
      if (v === K) {
        cnt++;
      } else {
        if (v - 1 >= 0 && !visited[v - 1]) {
          temp.push(v - 1);
        }

        if (v + 1 <= 100000 && !visited[v + 1]) {
          temp.push(v + 1);
        }

        if (v * 2 <= 100000 && !visited[v * 2]) {
          temp.push(v * 2);
        }
      }
    });

    temp.forEach((v) => {
      visited[v] = true;
    });

    time++;
    q = temp;
  }
}

// const input = '5 17';

// const MIN = 0;
// const MAX = 100000;

// function setNext(next, visit, stack) {
//   if (next < MIN || next > MAX) return;
//   if (visit[next]) return;
//   stack.push(next);
// }

// function solution(n, k) {
//   const visit = Array(MAX + 1).fill(false);

//   let list = [];
//   let time = -1;
//   let cnt = 0;

//   setNext(n, visit, list);

//   while (cnt === 0) {
//     const temp = [];

//     list.forEach((cur) => {
//       if (cur === k) {
//         cnt += 1;
//       } else {
//         setNext(cur + 1, visit, temp);
//         setNext(cur - 1, visit, temp);
//         setNext(cur * 2, visit, temp);
//       }
//     });

//     temp.forEach((num) => {
//       visit[num] = true;
//     });

//     time += 1;
//     list = temp;
//   }

//   return `${time}\n${cnt}`;
// }

// const [n, k] = input.split(' ').map(Number);
// const ans = solution(n, k);

// console.log(ans);
