const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 구현
  let cnt = 0;
  let time = -1;

  Solution(input);
  process.exit();

  function Solution(input) {
    const [N, K] = input[0].split(' ').map((el) => parseInt(el));
    const visited = new Array(100001).fill(false);

    Bfs(N, K, visited);
    console.log(`${time}\n${cnt}`);
  }

  function Bfs(N, K, visited) {
    let q = [];
    q.push(N);
    while (cnt === 0) {
      const temp = [];

      q.forEach((v) => {
        if (v === K) {
          cnt++;
        } else {
          if (v - 1 >= 0 && !visited[v - 1]) {
            temp.push(v - 1);
          }

          if (v + 1 <= 100000 && !visited[v + 1]) {
            temp.push(v + 1);
          }

          if (v * 2 <= 100000 && !visited[v * 2]) {
            temp.push(v * 2);
          }
        }
      });

      temp.forEach((v) => {
        visited[v] = true;
      });

      time++;
      q = temp;
    }
  }
});
