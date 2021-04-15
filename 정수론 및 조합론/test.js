const input = [[4], [4, 2, 3, 6]];

const N = input[0][0];
const factors = input[1];

factors.sort((a, b) => a - b);

console.log(factors[0] * factors[N - 1]);
