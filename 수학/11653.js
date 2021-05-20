const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `9991`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  let N = Number(input());
  let mod = 2;

  while (N !== 1) {
    if (N % mod === 0) {
      console.log(mod);
      N = N / mod;
    } else {
      mod++;
    }
  }
}
