const input = ['3', '26 40 83', '49 60 57', '13 89 99'];

console.log(Solution(input));

function Solution(input) {
  const N = Number(input.shift());
  const cost = Array.from(new Array(N + 1), () => new Array(3).fill(0));

  for (let i = 0; i < N; i++) {
    cost[i + 1] = input.shift().split(' ').map(Number);
  }

  console.log(cost);
}
