// 조합에서의 0의 개수 구하기는 2와 5의 승수 중에서 최소의 승수가 0의 개수이다.

// 조합에서의 최소 승수 구하기
// C(n, k) => n, n - k, k
// 2의 승수, 5의 승수 모두 동일하게 구한 후 최솟값이 0의 답이 된다.

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `25 4`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);

  const count2 = twoPower(N) - twoPower(N - M) - twoPower(M);
  const count5 = fivePower(N) - fivePower(N - M) - fivePower(M);

  const result = Math.min(count2, count5);

  return result;
}

function twoPower(num) {
  let count = 0;

  while (num >= 2) {
    count += parseInt(num / 2);
    num = parseInt(num / 2);
  }

  return count;
}

function fivePower(num) {
  let count = 0;

  while (num >= 5) {
    count += parseInt(num / 5);
    num = parseInt(num / 5);
  }

  return count;
}
