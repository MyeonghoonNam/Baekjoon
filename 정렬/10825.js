'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
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
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const arr = [];
  const result = [];

  for (let i = 0; i < N; i++) {
    arr.push(
      input()
        .split(' ')
        .map((el) => {
          return Number(el) ? Number(el) : el;
        })
    );
  }

  arr.sort((a, b) => {
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

  arr.forEach((el) => {
    result.push(el[0]);
  });

  return result.join('\n');
}
