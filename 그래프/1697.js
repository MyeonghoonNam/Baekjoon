const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line.trim());
}).on('close', () => {
  // 구현

  const [N, K] = input[0].split(' ').map((el) => parseInt(el));
  const visited = new Array(100001).fill(false);

  const queue = [[N, 0]];

  while (queue.length > 0) {
    const [pos, count] = queue.shift();

    if (visited[pos]) continue;

    visited[pos] = true;

    if (pos === K) {
      console.log(count);
      return;
    }

    if (pos * 2 <= 100000) {
      queue.push([pos * 2, count + 1]);
    }

    if (pos + 1 <= 100000) {
      queue.push([pos + 1, count + 1]);
    }

    if (pos - 1 <= 100000) {
      queue.push([pos - 1, count + 1]);
    }
  }

  process.exit();
});
