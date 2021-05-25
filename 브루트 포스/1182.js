const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5 0
-7 -3 -2 5 8`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, S] = input().split(' ').map(Number);
  const arr = input().split(' ').map(Number);
  let result = 0;

  //비트마스크 풀이
  for (let i = 1; i < 1 << N; i++) {
    let sum = 0;
    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        sum += arr[j];
      }
    }

    if (sum === S) {
      result++;
    }
  }

  return result;
}
