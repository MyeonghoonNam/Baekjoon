const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 2
1 3 0 0
3 0 0 2
4 0 2 0
2 0 2 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 한 국가의 등수 => 자신보다 더 잘한 나라의 수 + 1
 *
 * 요구사항: 각 국가의 금,은,동메달의 정보를 받아서, 어느 국가가 몇 등을 했는지 도출
 */

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  let result = 0;

  const gold = new Array(1001);
  const silver = new Array(1001);
  const bronze = new Array(1001);

  for (let i = 0; i < N; i++) {
    const [country, gold_count, silver_count, bronze_count] = input()
      .split(" ")
      .map(Number);

    gold[country] = gold_count;
    silver[country] = silver_count;
    bronze[country] = bronze_count;
  }

  // 인덱스를 국가번호로 취급
  for (let i = 1; i <= N; i++) {
    if (gold[i] > gold[K]) {
      result += 1;
    } else if (gold[i] === gold[K]) {
      if (silver[i] > silver[K]) {
        result += 1;
      } else if (silver[i] === silver[K]) {
        if (bronze[i] > bronze[K]) {
          result += 1;
        }
      }
    }
  }

  // 금, 은, 동 모두 같은 경우 순위의 반영이 안되는 상태이므로 +1을 마지막에 해준다.
  return result + 1;
};

console.log(solution());
