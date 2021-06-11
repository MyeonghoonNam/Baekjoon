'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7
0010100
0111010`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const compare = (arr) => {
    for (let i = 0; i < N; i++) {
      if (arr[i] !== output[i]) return false;
    }

    return true;
  };

  const switching = (arr, idx) => {
    for (let i = idx - 1; i <= idx + 1; i++) {
      if (i >= 0 && i < arr.length) {
        arr[i] = arr[i] ^ 1;
      }
    }
  };

  const N = Number(input());

  // 0번째 전구 스위치 off(기본값)
  const zeroOff = input().split('').map(Number);

  // 0번째 전구 스위치 on
  const zeroOn = zeroOff.slice();
  switching(zeroOn, 0);

  const output = input().split('').map(Number);

  let onCnt = 1;
  let offCnt = 0;
  for (let i = 1; i < N; i++) {
    if (zeroOff[i - 1] !== output[i - 1]) {
      switching(zeroOff, i);
      offCnt++;
    }

    if (zeroOn[i - 1] !== output[i - 1]) {
      switching(zeroOn, i);
      onCnt++;
    }
  }

  let result = -1;

  // 둘 다 결과값이 같은 경우
  if (compare(zeroOn) && compare(zeroOff)) {
    result = Math.min(offCnt, onCnt);
    return result;
  }

  // 둘 중 하나만 결과값이 같은 경우
  if (compare(zeroOn)) {
    result = onCnt;
    return result;
  } else if (compare(zeroOff)) {
    result = offCnt;
    return result;
  }

  return result;
}
