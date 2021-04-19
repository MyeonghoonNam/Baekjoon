const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const N = parseInt(line);

  Solution(N);

  function Solution(num) {
    const cards = [];
    for (let i = 1; i <= num; i++) {
      cards.push(i);
    }

    let prevIdx = 0;
    let lastIdx = num - 1;

    while (num-- > 1) {
      prevIdx++;
      cards[lastIdx + 1] = cards[prevIdx];
      lastIdx++;
      prevIdx++;
    }

    console.log(cards[prevIdx]);
  }
}).on('close', () => {
  process.exit();
});
