const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `ababababa
aba`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const document = input();
  const search = input();
  let result = 0;

  let currentIndex = 0;
  while (currentIndex <= document.length - search.length) {
    const str = document.slice(currentIndex, currentIndex + search.length);

    if (str === search) {
      result++;
      currentIndex += search.length;
    } else {
      currentIndex++;
    }
  }

  return result;
};

console.log(solution());
