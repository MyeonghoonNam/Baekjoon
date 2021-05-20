const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
1 45000
6 10
13 17`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const T = Number(input());

  for (let i = 0; i < T; i++) {
    const [num1, num2] = input().split(' ').map(Number);

    console.log(LCM(num1, num2));
  }
}

function GCD(a, b) {
  while (b !== 0) {
    const r = a % b;

    a = b;
    b = r;
  }

  return a;
}

function LCM(a, b) {
  return (a * b) / GCD(a, b);
}
