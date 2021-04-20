const input = [
  '4',
  'RDD',
  '4',
  '[1,2,3,4]',
  'DD',
  '1',
  '[42]',
  'RRD',
  '6',
  '[1,1,2,3,5,8]',
  'D',
  '0',
  '[]',
];

const T = parseInt(input[0]);

for (let i = 1; i <= T * 3; i += 3) {
  const P = input[i];
  const N = input[i + 1];
  const INPUT_ARRAY = input[i + 2].slice(1, input[i + 2].length - 1).split(',');

  console.log(Solve(P, INPUT_ARRAY));
}

function Solve(orders, arr) {
  let isReverse = false;
  let startPointer = 0;
  let endPointer = arr.length;

  for (v of orders) {
    if (v === 'R') {
      isReverse = !isReverse;
    } else if (v === 'D') {
      if (startPointer >= endPointer || !arr[startPointer]) {
        return 'error';
      }
      if (isReverse) {
        endPointer--;
      } else {
        startPointer++;
      }
    }
  }

  const answer = arr.slice(startPointer, endPointer);

  return isReverse
    ? `[${answer.reverse().join(',')}]`
    : `[${answer.join(',')}]`;
}
