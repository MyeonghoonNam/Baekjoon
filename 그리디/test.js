const input = [
  [11],
  [1, 4],
  [3, 5],
  [0, 6],
  [5, 7],
  [3, 8],
  [5, 9],
  [6, 10],
  [8, 11],
  [8, 12],
  [2, 13],
  [12, 14],
];

const N = input[0][0];
const times = input.slice(1);

times.sort((a, b) => {
  return a[1] - b[1] || a[0] - b[0];
});

let count = 0;
let prevEndTime = 0;

for (let i = 0; i < N; i++) {
  if (prevEndTime <= times[i][0]) {
    prevEndTime = times[i][1];
    count++;
  }
}

console.log(count);
