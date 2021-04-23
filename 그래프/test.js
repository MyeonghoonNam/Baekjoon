// const input = [
//   '6 4',
//   '0 0 0 0 0 0',
//   '0 0 0 0 0 0',
//   '0 0 0 0 0 0',
//   '0 0 0 0 0 1',
// ];
// const input = [
//   '6 4',
//   '0 -1 0 0 0 0',
//   '-1 0 0 0 0 0',
//   '0 0 0 0 0 0',
//   '0 0 0 0 0 1',
// ];
const input = [
  '6 4',
  '1 -1 0 0 0 0',
  '0 -1 0 0 0 0',
  '0 0 0 0 -1 0',
  '0 0 0 0 -1 1',
];

const [M, N] = input[0].split(' ').map((el) => parseInt(el));
input.shift();

const box = new Array(N);
for (let i = 0; i < N; i++) {
  box[i] = input[i].split(' ').map((el) => parseInt(el));
}

BFS();

function BFS() {
  const q = [];
  let day = 0;
  let zeroCount = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (box[i][j] === 1) {
        q.push([i, j, day]); // 이미 익은 토마토 이므로 day = 0
      } else if (box[i][j] === 0) {
        zeroCount++;
      }
    }
  }

  let head = 0;
  while (q.length > head) {
    const size = q.length - head;
    for (let s = 0; s < size; s++) {
      const current = q[head++];

      const x = current[0];
      const y = current[1];
      day = current[2];

      for (let i = 0; i < 4; i++) {
        const next_X = x + dx[i];
        const next_Y = y + dy[i];

        if (next_X >= 0 && next_X < N && next_Y >= 0 && next_Y < M) {
          if (box[next_X][next_Y] === 0) {
            zeroCount--;
            box[next_X][next_Y] = 1;
            q.push([next_X, next_Y, day + 1]);
          }
        }
      }
    }
  }

  if (zeroCount !== 0) {
    console.log(-1);
  } else {
    console.log(day);
  }
}

// function checkTomato() {
//   for (let i = 0; i < N; i++) {
//     for (let j = 0; j < M; j++) {
//       if (box[i][j] === 0) {
//         return false;
//       }
//     }
//   }

//   return true;
// }
