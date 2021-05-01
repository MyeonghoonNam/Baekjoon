const input = [20, 7, 23, 19, 10, 15, 25, 8, 13];

console.log(Solution(input));

function Solution(input) {
  input.sort((a, b) => a - b);

  const sum = input.reduce((acc, cur) => {
    return acc + cur;
  });

  let result = '';
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (sum - input[i] - input[j] === 100) {
        for (let k = 0; k < input.length; k++) {
          if (k === i || k === j) continue;

          result += input[k] + '\n';
        }

        return result;
      }
    }
  }
}
