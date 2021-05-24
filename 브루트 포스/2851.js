const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10
20
30
40
50
60
70
80
90
100`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const arr = Array.from(new Array(10), () => Number(input()));

  let sum = 0;
  for (let score of arr) {
    const temp = sum;
    sum += score;

    if (sum >= 100) {
      if (Math.abs(100 - sum) > Math.abs(100 - temp)) {
        sum = temp;
      }

      break;
    }
  }

  return sum;
}
