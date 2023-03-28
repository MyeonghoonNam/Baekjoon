const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
100
200
12345
1003`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let T = Number(input());
  const result = [];
  const fibonacci = [0, 1];
  const MAX_NUMBER = 1000000000;

  while (fibonacci[fibonacci.length - 1] < MAX_NUMBER) {
    fibonacci.push(
      fibonacci[fibonacci.length - 2] + fibonacci[fibonacci.length - 1]
    );
  }

  while (T--) {
    let number = Number(input());
    let testResult = [];
    let maxFibonacciIndex = fibonacci.length - 1;

    while (number > 0) {
      if (number >= fibonacci[maxFibonacciIndex]) {
        number -= fibonacci[maxFibonacciIndex];
        testResult.push(fibonacci[maxFibonacciIndex]);
      }

      maxFibonacciIndex -= 1;
    }

    result.push(testResult.reverse().join(" "));
  }

  return result.join("\n");
};

console.log(solution());
