const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
1 2 3 4 5 6
2 1 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * N개의 수, N - 1개의 연산자
 * 연산자 종류는 +,-,*,/
 * 주어진 수의 순서를 바꾸면 안된다.
 * 식의 계산은 연산자 우선 순위를 무시하고 앞에서 부터 진행
 * 나눗셈은 정수 나눗셈으로 몫만 취한다.
 * 음스룰 양수로 나누기 => 음수를 양수 전환하여 몫을 구하고 몫을 음수 전환
 *
 * 요구사항 : 주어진 수와 연산자를 토대로 만들 수 있는 식의 결과의 최대, 최소 도출
 *
 * 1. 연산자가 사용될 수 있는 모든 식의 경우에 대해 구현
 * 2. 모든 경우에 대해 탐색할 때 백트래킹 기법을 활용
 * 3. 하나의 식이 끝날 떄 최대 최소 값 갱신하며 탐색
 */

const solution = () => {
  const N = Number(input());
  const numbers = input().split(" ").map(Number);
  const operator_count = input().split(" ").map(Number); // +, -, *, /

  let max_value = Number.MIN_SAFE_INTEGER;
  let min_value = Number.MAX_SAFE_INTEGER;

  const backtracking = (number_count, value) => {
    if (number_count === N) {
      max_value = Math.max(max_value, value);
      min_value = Math.min(min_value, value);

      return;
    }

    for (let i = 0; i < operator_count.length; i++) {
      if (operator_count[i] === 0) continue;

      operator_count[i] -= 1;

      switch (i) {
        case 0:
          backtracking(number_count + 1, value + numbers[number_count]);
          break;
        case 1:
          backtracking(number_count + 1, value - numbers[number_count]);
          break;
        case 2:
          backtracking(number_count + 1, value * numbers[number_count]);
          break;
        case 3:
          backtracking(
            number_count + 1,
            parseInt(value / numbers[number_count])
          );
          break;
      }

      operator_count[i] += 1;
    }
  };

  backtracking(1, numbers[0]); // 시작하는 수의 개수와, 식에서 시작하는 수
  return `${max_value}\n${min_value}`;
};

console.log(solution());
