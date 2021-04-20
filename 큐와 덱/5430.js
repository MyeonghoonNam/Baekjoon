const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .slice(1);

while (input.length) {
  const orders = input.shift();
  input.shift();
  let arr = input.shift();
  arr = arr
    .slice(1, arr.length - 1)
    .split(',')
    .map((v) => parseInt(v, 10));

  arr = arr[0] ? arr : [];

  console.log(ex(orders, arr));
}
function ex(orders, arr) {
  let revers = false;
  let start_pointer = 0;
  let end_pointer = arr.length;
  for (v of orders) {
    if (v === 'R') {
      revers = !revers;
    } else if (v === 'D') {
      if (start_pointer >= end_pointer || !arr[start_pointer]) return 'error';

      if (revers) {
        end_pointer--;
      } else start_pointer++;
    }
  }

  const answer = arr.slice(start_pointer, end_pointer);

  return revers ? `[${answer.reverse().join(',')}]` : `[${answer.join(',')}]`;
}
