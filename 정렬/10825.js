const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `12
Junkyu 50 60 100
Sangkeun 80 60 50
Sunyoung 80 70 100
Soong 50 60 90
Haebin 50 60 100
Kangsoo 60 80 100
Donghyuk 80 60 100
Sei 70 70 70
Wonseob 70 70 90
Sanghyun 70 70 80
nsj 80 80 80
Taewhan 50 60 90`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 국어 내림차순
 * 영어 오름차순
 * 수학 내림차순
 * 이름 오름차순
 *
 * 요구사항: 위와 같은 조건으로 학생의 성적을 정렬한 결과에서 학생들 이름을 출력
 */
const solution = () => {
  const N = Number(input());
  const score = [];

  for (let i = 0; i < N; i++) {
    const data = input()
      .split(" ")
      .map((e) => {
        if (Number(e)) {
          return Number(e);
        }

        return e;
      });

    score.push(data);
  }

  // 0: 이름, 1: 국어, 2: 영어, 3: 수학
  score.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    else if (a[1] < b[1]) return 1;
    else {
      if (a[2] > b[2]) return 1;
      else if (a[2] < b[2]) return -1;
      else {
        if (a[3] > b[3]) return -1;
        else if (a[3] < b[3]) return 1;
        else {
          if (a[0] > b[0]) return 1;
          else if (a[0] < b[0]) return -1;
          else return 0;
        }
      }
    }
  });

  const result = [];
  for (let i = 0; i < score.length; i++) {
    const name = score[i][0];
    result.push(name);
  }

  return result.join("\n");
};

console.log(solution());
