const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(Number(line));
}).on('close', () => {
  // 구현
  console.log(Solution(input));

  function Solution(input) {
    input.sort((a, b) => a - b);

    const sum = input.reduce((acc, cur) => {
      return acc + cur;
    });

    let result = '';
    for (let i = 0; i < input.length; i++) {
      for (let j = i + 1; j < input.length; j++) {
        if (sum - input[i] - input[j] === 100) {
          for (let k = 0; k < input.length; k++) {
            if (k === i || k === j) continue;

            result += input[k] + '\n';
          }

          return result;
        }
      }
    }
  }
});
