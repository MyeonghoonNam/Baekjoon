'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [S, T] = input().split(' ').map(Number);
  const visited = new Set();

  let result = 0;

  if (S === T) return result;
  else result = -1;

  const bfs = () => {
    const q = [[S, '']];

    visited.add(S);

    while (q.length > 0) {
      const [curNum, useMod] = q.shift();

      if (curNum === T) {
        result = useMod;
        return;
      }

      for (let i = 0; i < 4; i++) {
        let nextNum = curNum;
        let updateMod = useMod;

        switch (i) {
          case 0:
            nextNum *= curNum;
            updateMod += '*';
            break;
          case 1:
            nextNum += curNum;
            updateMod += '+';
            break;
          case 2:
            nextNum -= curNum;
            updateMod += '-';
            break;
          case 3:
            if (curNum !== 0) {
              nextNum = parseInt(nextNum / nextNum);
              updateMod += '/';
              break;
            }
        }

        if (!visited.has(nextNum)) {
          visited.add(nextNum);
          q.push([nextNum, updateMod]);
        }
      }
    }
  };

  bfs();

  return result;
}
