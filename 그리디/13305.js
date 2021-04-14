const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line.split(' ').map((el) => BigInt(el)));
}).on('close', () => {
  const N = Number(input[0][0]);
  const dist = input[1];
  const cost = input[2];

  let sum = 0n;
  let minCost = cost[0];

  for (let i = 0; i < N - 1; i++) {
    if (cost[i] < minCost) {
      minCost = cost[i];
    }

    sum += minCost * dist[i];
  }

  console.log(sum.toString());

  process.exit();
});
