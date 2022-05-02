const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `int& aqwdasd*[]&, qweb, c*;`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 기본 변수형, 배열: [], 참조: &, 포인터: *
 * 배열, 참조, 포인터는 순서에 상관없이 혼합 사용 가능
 *   => int&&[]*: int형 변수의 참조의 참조의 배열의 포인터
 * 여러 개의 변수를 한 줄에 정의할 수 있다.
 * 공통된 변수형을 제일 먼저 쓰고 그 다음에 각 변수의 이름과 추가적인 변수형을 쓴다
 *  => int& a*[]&, b, c*;
 *  => a: int&&[]*, b: int&, c: int&*
 *  => 추가적인 변수형은 순서를 뒤집어서 왼편에 붙일 수 있다.
 *  => int*& a === int a&*
 *
 * 요구사항: 복잡한 한 줄의 변수 선언문을 한 줄에 변수 하나씩 선언하는데 각각의 변수의 오른편에 있는 추가 변수형을 모두 왼쪽으로 옮기어 선언하기
 *
 * 1. 공통된 변수형 추출
 * 2. ,와 ; 제거
 * 3. 문자열 뒤집은 후 '[', ']' 체크
 * 4. 공통 변수형 + 추가 변수형 + ' ' + 변수명 + ';'
 */

const solution = () => {
  const string_list = input().split(" ");
  const common = string_list.shift();
  const alphabet = /^[a-zA-Z]*$/;
  const result = [];

  string_list.forEach((str) => {
    let operator = "";
    let name = "";

    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (alphabet.test(char)) {
        name += char;
      } else if (char !== "," && char !== ";") {
        operator += char;
      }
    }

    let operator_reverse = "";
    for (let i = operator.length - 1; i >= 0; i--) {
      const char = operator[i];

      if (char === "[") operator_reverse += "]";
      else if (char === "]") operator_reverse += "[";
      else operator_reverse += char;
    }

    result.push(`${common}${operator_reverse} ${name};`);
  });

  return result.join("\n");
};

console.log(solution());
