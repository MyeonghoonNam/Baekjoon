const input = [5, 2];
const N = input[0];
const K = input[1];

console.log(BC(N, K));

function BC(n, k) {
  if (k === 0 || n === k) {
    return 1;
  } else {
    return BC(n - 1, k - 1) + BC(n - 1, k);
  }
}
