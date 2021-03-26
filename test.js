const input = [5, 'aba', 'abab', 'abcabc', 'a', 'baa'];

const N = parseInt(input.shift());
let counter = N;
 
for (let i = 0; i < N; i++) {
  const charMap = {};
  for (let j = 0; j < input[i].length; j++) {
    if (!charMap[input[i][j]]) {
      charMap[input[i][j]] = true;
    } else if (input[i][j] !== input[i][j - 1]) {
      counter--;
      break;
    }
  }
}
 
console.log(counter);