const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
5 50
4 40
3 30
2 20
1 10
1 10
2 20
3 30
4 40
5 50`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const DP = new Array(N + 2).fill(0);
  const time = [0];
  const price = [0];

  for (let i = 0; i < N; i++) {
    const [t, p] = input().split(" ").map(Number);
    time.push(t);
    price.push(p);
  }

  // DP[1] = 1일 전까지의 일을 하여 벌수 있는 최대 금액이므로 최대일 + 1까지 값 초기화
  time.push(0);
  price.push(0);

  let result = 0;
  for (let i = 1; i <= N + 1; i++) {
    result = Math.max(result, DP[i]);

    if (i + time[i] > N + 1) continue;
    DP[i + time[i]] = Math.max(result + price[i], DP[i + time[i]]);
  }

  return result;
};

console.log(solution());
