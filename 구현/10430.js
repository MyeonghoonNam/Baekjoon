const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5 8 4`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const [A, B, C] = input().split(' ').map(Number);

  const one = (A + B) % C;
  const two = ((A % C) + (B % C)) % C;
  const three = ((A % C) * (B % C)) % C;
  const four = ((A % C) * (B % C)) % C;

  console.log(one);
  console.log(two);
  console.log(three);
  console.log(four);
}
