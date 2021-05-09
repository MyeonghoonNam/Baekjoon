const fs = require('fs');
const stdin = (process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString()
  : `2
I am happy today
We want to win the first prize`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const T = Number(input());

for (let i = 0; i < T; i++) {
  const str = input().split(' ');

  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].split('').reverse().join('');
  }

  console.log(str.join(' '));
}
