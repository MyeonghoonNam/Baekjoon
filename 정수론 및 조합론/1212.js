const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `314`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let oct = input().split('');
  let result = '';

  oct.forEach((num, i) => {
    const dex = parseInt(num, 8);
    let binary = dex.toString(2);

    while (i !== 0 && binary.length < 3) {
      binary = '0' + binary;
    }

    result += binary;
  });

  return result;
}
