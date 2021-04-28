const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 구현
  console.log(Solution(input));

  function Solution(input) {
    const [N, K] = input[0].split(' ').map(Number);

    const MAX = 100000;
    const time = new Array(MAX + 1).fill(-1);

    const q = [N];
    time[N] = 0;

    let head = 0;
    while (q.length) {
      const idx = q[head++];

      if (idx === K) {
        break;
      }

      if (idx * 2 <= MAX && time[idx * 2] === -1) {
        time[idx * 2] = time[idx];
        q.push(idx * 2);
      }

      if (idx - 1 >= 0 && time[idx - 1] === -1) {
        time[idx - 1] = time[idx] + 1;
        q.push(idx - 1);
      }

      if (idx + 1 <= MAX && time[idx + 1] === -1) {
        time[idx + 1] = time[idx] + 1;
        q.push(idx + 1);
      }
    }
    return time[K];
  }
});
