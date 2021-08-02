'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4 11
802
743
457
539`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [K, N] = input().split(' ').map(Number);
  const lanLines = [];
  let result = 0;

  let maxLanLine = 0;

  for (let i = 0; i < K; i++) {
    const lanLine = Number(input());

    lanLines[i] = lanLine;

    if (maxLanLine < lanLine) maxLanLine = lanLine;
  }

  let low = 1;
  let high = maxLanLine;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (isPossible(mid, lanLines, K, N)) {
      if (result < mid) {
        result = mid;
      }

      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
}

function isPossible(length, lanLines, curLineCount, needLineCount) {
  let count = 0;

  for (let i = 0; i < curLineCount; i++) {
    count += Math.floor(lanLines[i] / length);
  }

  if (count >= needLineCount) {
    return true;
  } else {
    return false;
  }
}
