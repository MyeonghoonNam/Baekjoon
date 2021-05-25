const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `0001011000
0000101111`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const A = input();
  const B = input();

  const len = A.length;
  const result = [];

  const And = (a, b) => {
    let n = '';

    for (let i = 0; i < len; i++) {
      n += a[i] & b[i];
    }

    result.push(n);
  };

  const Or = (a, b) => {
    let n = '';

    for (let i = 0; i < len; i++) {
      n += a[i] | b[i];
    }

    result.push(n);
  };

  const Xor = (a, b) => {
    let n = '';

    for (let i = 0; i < len; i++) {
      n += a[i] ^ b[i];
    }

    result.push(n);
  };

  const Not = (num) => {
    let n = '';

    for (let i = 0; i < len; i++) {
      n += num[i] === '1' ? '0' : '1';
    }

    result.push(n);
  };

  And(A, B);
  Or(A, B);
  Xor(A, B);
  Not(A);
  Not(B);

  return result.join('\n');
}
