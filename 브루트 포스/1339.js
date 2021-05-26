'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `2
GCF
ACDEB`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const arr = new Array(26).fill(0);
  const countArr = [];

  for (let i = 0; i < N; i++) {
    const word = input();
    let cnt = 1;

    for (let j = word.length - 1; j >= 0; j--) {
      arr[word[j].charCodeAt(0) - 'A'.charCodeAt(0)] += cnt;
      cnt *= 10;
    }
  }

  arr.forEach((cnt) => {
    if (cnt !== 0) {
      countArr.push(cnt);
    }
  });

  countArr.sort((a, b) => b - a);

  let value = 9;
  let result = 0;
  countArr.forEach((num) => {
    result += num * value;
    value--;
  });

  return result;
}
