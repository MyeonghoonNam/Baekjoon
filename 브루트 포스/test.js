// const input = ['100000000'];
const input = ['8'];

console.log(Solution(input));

function Solution() {
  const N = Number(input[0]);
  const len = input[0].length;

  if (len === 1) {
    return N;
  }

  let result = 0;
  for (let i = 1; i < len; i++) {
    result += 9 * Math.pow(10, i - 1) * i;
  }

  result += (N - Math.pow(10, len - 1) + 1) * len;

  return result;
}
