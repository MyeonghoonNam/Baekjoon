const input = [25, 12];

const N = input[0];
const M = input[1];

// 팩토리얼에서는 5의 승수를 구하면 간단하다.
// 조합에서의 0의 개수 구하기는 2와 5의 승수 중에서 최소의 승수가 0의 개수이다.

// 조합에서의 최소 승수 구하기
// C(n, k) => n, n - k, k
// 2의 승수, 5의 승수 모두 동일하게 구한 후 최솟값이 0의 답이 된다.

const count2 = twoPower(N) - twoPower(N - M) - twoPower(M);
const count5 = fivePower(N) - fivePower(N - M) - fivePower(M);

const result = Math.min(count2, count5);

console.log(result);

function twoPower(n) {
  let count = 0;
  while (n >= 2) {
    count += parseInt(n / 2);
    n = parseInt(n / 2);
  }

  return count;
}

function fivePower(n) {
  let count = 0;

  while (n >= 5) {
    count += parseInt(n / 5);
    n = parseInt(n / 5);
  }

  return count;
}
