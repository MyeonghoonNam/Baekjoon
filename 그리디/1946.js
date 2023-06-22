const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
5
3 2
1 4
4 1
2 3
5 5
7
3 6
7 3
4 2
1 4
5 7
2 5
6 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const N = Number(input());
    const score = [];

    for (let i = 0; i < N; i += 1) {
      const [document, interview] = input().split(" ").map(Number);
      score.push({ document, interview });
    }

    score.sort((a, b) => a.document - b.document);

    let count = 1;
    let temp = score[0].interview;

    for (let i = 1; i < N; i += 1) {
      let currentInterviewScore = score[i].interview;

      if (currentInterviewScore < temp) {
        temp = currentInterviewScore;
        count += 1;
      }
    }

    result.push(count);
  }

  return result.join("\n");
};

console.log(solution());
