const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `baekjoon!`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const S = input();
  const idxArr = new Array(26).fill(-1);

  for (let i = 0; i < S.length; i++) {
    if (idxArr[S[i].charCodeAt(0) - 'a'.charCodeAt(0)] === -1) {
      idxArr[S[i].charCodeAt(0) - 'a'.charCodeAt(0)] = i;
    }
  }

  return idxArr.join(' ');
}
