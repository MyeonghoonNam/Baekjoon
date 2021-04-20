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
  const T = parseInt(input[0]);

  for (let i = 1; i <= T * 3; i += 3) {
    const P = input[i];
    const N = input[i + 1];
    const INPUT_ARRAY = input[i + 2]
      .slice(1, input[i + 2].length - 1)
      .split(',');

    console.log(Solve(P, INPUT_ARRAY));
  }

  function Solve(orders, arr) {
    let isReverse = false;
    let startPointer = 0;
    let endPointer = arr.length;

    for (v of orders) {
      if (v === 'R') {
        isReverse = !isReverse;
      } else if (v === 'D') {
        if (startPointer >= endPointer || !arr[startPointer]) {
          return 'error';
        }

        if (isReverse) {
          endPointer--;
        } else {
          startPointer++;
        }
      }
    }

    const answer = arr.slice(startPointer, endPointer);

    return isReverse
      ? `[${answer.reverse().join(',')}]`
      : `[${answer.join(',')}]`;
  }
});
