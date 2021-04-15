const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  const N = input[0][0];
  const rings = input[1];

  const firstRing = rings[0];
  let result = '';

  for (let i = 1; i < N; i++) {
    const otherRing = rings[i];
    const gcdValue = GCD(firstRing, otherRing);

    result += `${firstRing / gcdValue}/${otherRing / gcdValue}\n`;
  }

  console.log(result);
  process.exit();

  function GCD(a, b) {
    if (b === 0) {
      return a;
    } else {
      return GCD(b, a % b);
    }
  }
});
