const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `-13`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let N = Number(input());
  let result = '';

  if (N === 0) {
    return 0;
  }

  while (N !== 0) {
    if (N % -2 === 0) {
      result = '0' + result;
      N = parseInt(N / -2);
    } else {
      if (N > 0) {
        N = -parseInt(N / 2);
      } else {
        N = parseInt((-N + 1) / 2);
      }

      result = '1' + result;
    }
  }

  return result;
}
