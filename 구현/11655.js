const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `One is 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let str = input();
  const result = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if ('A' <= char && char <= 'Z') {
      if (char.charCodeAt(0) + 13 > 'Z'.charCodeAt(0)) {
        result[i] = String.fromCharCode(char.charCodeAt(0) + 13 - 26);
      } else {
        result[i] = String.fromCharCode(char.charCodeAt(0) + 13);
      }
    } else if ('a' <= char && char <= 'z') {
      if (char.charCodeAt(0) + 13 > 'z'.charCodeAt(0)) {
        result[i] = String.fromCharCode(char.charCodeAt(0) + 13 - 26);
      } else {
        result[i] = String.fromCharCode(char.charCodeAt(0) + 13);
      }
    } else {
      result[i] = char;
    }
  }

  return result.join('');
}
