const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `baekjoon`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const S = input();
  const count = new Array(26).fill(0);

  for (let i = 0; i < S.length; i++) {
    count[S[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  return count.join(' ');
}

// 문자 or 문자열.charCodeAt(자릿수(0부터)) = 문자의 ASCII 코드 값
// String.fromCharCode(유니코드 값) = 유니코드를 문자로 변환
