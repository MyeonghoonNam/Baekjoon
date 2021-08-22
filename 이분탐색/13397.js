const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7 4
1 2 3 1 2 3 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  /*
  N개의 수 1차원 배열을 M개 이하의 구간으로 나눈다.
  구간의 점수들의 최댓값을 최소로 하려한다.
  구간의 점수는 구간에 속한 수의 최댓값과 최소값의 차이이다.
  
  구간 조건
  1. 하나의 구간은 하나 이상의 연속된 수들로 이루어져야 한다.
  2. 배열의 각 수는 모두 하나의 구간에 포함되어야 한다. 

  최종값은 구간의 수를 만족하며, 그 때 구간의 점수들 중에서 최댓값이 최소로 이루어져야한다.
  
  구간의 경우의 수가 완전탐색으로 이루어질 경우 N의 입력에 따라 기하급수적으로 늘어날 것 같아서 이분탐색을 활용하여 구현하였다.
  */

  const [N, M] = input().split(' ').map(Number);
  const arr = input().split(' ').map(Number);
  const max = Math.max(...arr);
  let result = max;

  const calculate = (maxScore) => {
    let minValue = arr[0];
    let maxValue = arr[0];
    let count = 1;

    for(let i = 1; i < N; i++) {
      if(arr[i] < minValue) minValue = arr[i];
      if(arr[i] > maxValue) maxValue = arr[i];

      if((maxValue - minValue) > maxScore) {
        count++;

        minValue = arr[i];
        maxValue = arr[i];
      }
    }

    return count <= M
  }

  let low = 0;
  let high = max;

  while(low <= high) {
    const mid = Math.floor((low + high) / 2);

    if(calculate(mid)) {
      if(result > mid) {
        result = mid;
      }

      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
}
