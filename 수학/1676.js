// 팩토리얼에서는 5의 승수를 구하면 간단히 0의 개수를 구할 수 있다.
// parseInt => 정수형
// Number => 실수형도 가능

const fs = require('fs');
const stdin = (
  process.platform === 'linux' ? fs.readFileSync('/dev/stdin').toString() : `10`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let N = Number(input());
  let count = 0;

  while (N >= 5) {
    count += parseInt(N / 5);
    N = parseInt(N / 5);
  }

  return count;
}
