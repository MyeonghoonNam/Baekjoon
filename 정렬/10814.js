const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
21 Junkyu
21 Dohyun
20 Sunyoung`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const users = [];
  let result = "";

  for (let i = 0; i < N; i++) {
    users.push(input().split(" "));
  }

  users.sort((a, b) => Number(a[0]) - Number(b[0]));

  for (let i = 0; i < N; i++) {
    const [age, name] = users[i];
    result += `${age} ${name}\n`;
  }

  return result;
};

console.log(solution());
