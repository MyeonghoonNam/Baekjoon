const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `24 18`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const [num1, num2] = input().split(' ').map(Number);

  console.log(GCD(num1, num2));
  console.log(LCM(num1, num2));
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
