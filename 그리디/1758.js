const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
1
2
3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 8시
 * 희망 팁 - (받은 등수 - 1) = 팁
 * 팁 < 0 : 팁 += 0
 * 팁 > 0 : 팁 += 팁
 *
 * 요구사항: 팁의 최댓값 도출
 *
 * 손님의 순서를 적절히 바꿀 수 있다.
 * 희망 팁이 클 수록 일찍 커피를 일찍 받으면 감소하는 팁이 줄어든다.
 * 희망 팁이 높은 순으로 커피를 일찍 주기
 *
 */
const solution = () => {
  const N = Number(input());
  let line = [];

  for (let i = 0; i < N; i++) {
    line.push(Number(input()));
  }

  line.sort((a, b) => b - a);

  line = line.map((tip, i) => {
    const t = tip - i;

    return t > 0 ? t : 0;
  });

  const result = line.reduce((acc, cur) => acc + cur, 0);

  return result;
};

console.log(solution());
