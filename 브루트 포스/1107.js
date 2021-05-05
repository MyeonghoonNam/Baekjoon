const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  if (line !== '0') {
    input.push(line);
  }
}).on('close', () => {
  // 구현
  const N = Number(input.shift());
  const M = Number(input.shift());
  const broken = input.shift().split(' ').map(Number);
  const brokenNumbers = new Array(10).fill(false);

  for (let i = 0; i < M; i++) {
    const number = broken[i];

    brokenNumbers[number] = true;
  }

  console.log(Solution());

  function Solution() {
    // 기호 버튼만 누른 경우
    let minBtnCnt = Math.abs(N - 100);

    for (let i = 0; i <= 1000000; i++) {
      // 숫자 버튼 개수
      const minNumBtnCnt = CheckNumBtnCnt(i);
      if (minNumBtnCnt > 0) {
        // 숫자 입력 후 부호 버튼 개수
        let signBtnCnt = Math.abs(N - i);

        minBtnCnt = Math.min(minBtnCnt, minNumBtnCnt + signBtnCnt);
      }
    }

    return minBtnCnt;
  }

  function CheckNumBtnCnt(num) {
    if (num === 0) {
      if (brokenNumbers[0]) {
        return 0;
      } else {
        return 1;
      }
    }

    let len = 0;
    while (num > 0) {
      if (brokenNumbers[num % 10]) {
        return 0;
      }

      num = parseInt(num / 10);
      len++;
    }

    return len;
  }
});
