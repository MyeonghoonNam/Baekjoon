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
  const times = input.slice(1);

  times.sort((a, b) => {
    return a[1] - b[1] || a[0] - b[0];
  });

  let count = 0;
  let prevEndTime = 0;

  for (let i = 0; i < N; i++) {
    if (prevEndTime <= times[i][0]) {
      prevEndTime = times[i][1];
      count++;
    }
  }

  console.log(count);
  process.exit();
});
