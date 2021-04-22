const input = [
  [3, 2],
  [1, 2],
  [3, 4],
  [5, 6],
  [2, 3],
  [-1, -2, 0],
  [0, 0, 3],
];

const N = input[0][0];
const M = input[N + 1][0];
const K = input[N + 1][1];

const A = [];
const B = [];

for (i = 1; i <= N; i++) {
  A.push(input[i]);
}

for (i = N + 2; i <= N + M + 1; i++) {
  B.push(input[i]);
}

const multiply = Array.from(new Array(N), () => new Array(K).fill(0));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < K; j++) {
    for (let k = 0; k < M; k++) {
      multiply[i][j] += A[i][k] * B[k][j];
    }
  }
}

let result = '';
for (let i = 0; i < multiply.length; i++) {
  result += `${multiply[i].join(' ')}\n`;
}

console.log(result);
