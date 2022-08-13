const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
4
5
3
7
6
2
1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const books = [];

  for (let i = 0; i < N; i++) {
    const book = Number(input());
    books.push(book);
  }

  let result = N;
  for (let i = N - 1; i >= 0; i--) {
    if (books[i] === result) {
      result--;
    }
  }

  return result;
};

console.log(solution());
