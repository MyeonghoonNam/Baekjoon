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
  const N = Number(input[0]);
  const arr = input[1].split(' ').map(Number);

  let pos = -1;

  for (let i = N - 1; i > 0; i--) {
    if (arr[i - 1] > arr[i]) {
      pos = i - 1;
      break;
    }
  }

  if (pos === -1) console.log(-1);
  else {
    const temp = [];

    for (let i = pos; i < N; i++) {
      temp.push(arr[i]);
    }

    temp.sort((a, b) => a - b);

    let startIdx = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === arr[pos]) {
        startIdx = temp[i - 1];
        break;
      }
    }

    const result = [];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === startIdx) continue;

      result.push(temp[i]);
    }

    result.sort((a, b) => b - a);

    let sol = '';
    for (let i = 0; i < pos; i++) {
      sol += arr[i].toString() + ' ';
    }

    sol += startIdx.toString() + ' ';
    for (let i = 0; i < result.length; i++) {
      sol += String(result[i]) + ' ';
    }

    console.log(sol);
  }
});
