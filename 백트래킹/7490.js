const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3
7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let T = Number(input());
  while (T--) {
    const N = Number(input());
    const numbers = new Array(N).fill(0).map((_, i) => i + 1);
    const operator = ["+", "-", " "].sort();
    const selected = [];

    const dfs = (cnt) => {
      if (cnt === N - 1) {
        let expression = "";

        for (let i = 0; i < N; i++) {
          expression += numbers[i];
          expression += selected[i] ?? "";
        }

        const sum = eval(expression.replaceAll(" ", ""));

        if (sum === 0) {
          console.log(expression);
        }

        return;
      }

      for (let i = 0; i < operator.length; i++) {
        selected[cnt] = operator[i];
        dfs(cnt + 1);
      }
    };

    dfs(0);
    console.log();
  }
};

solution();
