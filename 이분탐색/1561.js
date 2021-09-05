const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `22 5
1 2 3 4 5`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(' ').map(Number);
  const rides = input().split(' ').map(Number);
  let result = 0;

  if (N <= M) {
    return N;
  }

  const time = binarySearch(N, M, rides);
  let children = M;

  for (let i = 0; i < M; i++) {
    children += Math.floor((time - 1) / rides[i]);
  }

  for (let i = 0; i < M; i++) {
    if (time % rides[i] === 0) {
      children++;
    }

    if (children === N) {
      result = i + 1; // 0번 놀이기구는 존재하지 않으므로
      break;
    }
  }

  return result;
};

const binarySearch = (N, M, rides) => {
  let low = 1;
  let high = 2000000000 * 30;
  let result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let children = M;

    for (let i = 0; i < M; i++) {
      children += Math.floor(mid / rides[i]);
    }

    if (children >= N) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
};

console.log(solution());
