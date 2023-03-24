// const fs = require("fs");
// const stdin = (
//   process.platform === "linux"
//     ? fs.readFileSync("/dev/stdin").toString()
//     : `2
// 5
// 3 2
// 1 4
// 4 1
// 2 3
// 5 5
// 7
// 3 6
// 7 3
// 4 2
// 1 4
// 5 7
// 2 5
// 6 1`
// ).split("\n");

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// const solution = () => {
//   const result = [];
//   let T = Number(input());

//   while (T--) {
//     const N = Number(input());
//     const score = [];

//     for (let i = 0; i < N; i++) {
//       const [first_score, second_score] = input().split(" ").map(Number);
//       score.push({ first_score, second_score });
//     }

//     // 서류 성적을 기준으로 오름차순 정렬
//     score.sort((a, b) => a.first_score - b.first_score);

//     let count = 1; // 서류와 면접 모두 1등하는 경우 최대 1명
//     let temp = score[0].second_score;

//     for (let i = 1; i < N; i++) {
//       // 서류 성적 기준 정렬을 통해 면접 성적만 비교하여 합격자를 선정할 수 있다.
//       if (score[i].second_score < temp) {
//         temp = score[i].second_score;
//         count += 1;
//       }
//     }

//     result.push(count);
//   }

//   return result.join("\n");
// };

// console.log(solution());

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
  let T = Number(input());
  const result = [];

  while (T--) {
    const N = Number(input());
    const scoreList = [];
    let minScore = 1000001;
    let count = 0;

    for (let i = 0; i < N; i++) {
      const [paper, interview] = input().split(" ").map(Number);
      scoreList.push({ paper, interview });
    }

    scoreList.sort((a, b) => a.paper - b.paper);

    for (let i = 0; i < N; i++) {
      const score = scoreList[i];

      if (score.interview < minScore) {
        count += 1;
        minScore = score.interview;
      }
    }

    result.push(count);
  }

  return result.join("\n");
};

console.log(solution());
