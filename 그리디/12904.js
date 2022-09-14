const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `AB
ABB`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/*
 * 문자열의 뒤에 A를 추가
 * 문자열을 뒤집고 뒤에 B를 추가
 *
 * 요구사항: 문자열 S를 T로 바꿀 수 있으면 1을 아니면 0을 도출
 *
 * 작은 문자열에서 큰 문자열로 접근하면 모든 경우의 수를 생각하며 비교해야 하므로 큰 문자열에서 작은 문자열로 유추하는 과정으로 해결
 *
 * 위 2가지 연산을 큰 문자열에서 부터 잘라내간다
 * 마지막 문자가 A이거나 B인 경우로 두 연산이 끝나므로
 * if 마지막 문자 === A : 마지막 문자 pop
 * if 마지막 문자 === B : 마지막 문자 pop & 문자열 reverse
 */

const solution = () => {
  let S = input().split("");
  let T = input().split("");

  while (S.length !== T.length) {
    if (T[T.length - 1] === "A") {
      T.pop();
    } else if (T[T.length - 1] === "B") {
      T.pop();
      T.reverse();
    }
  }

  S = S.join("");
  T = T.join("");

  return S === T ? 1 : 0;
};

console.log(solution());
