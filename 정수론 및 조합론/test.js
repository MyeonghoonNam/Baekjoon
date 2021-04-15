const input = [[3], [1, 45000], [6, 10], [13, 17]];

const N = input[0][0];
const numbers = input.slice(1);

let result = '';
for (let i = 0; i < N; i++) {
  result +=
    LCM(numbers[i][0] * numbers[i][1], GCD(numbers[i][0], numbers[i][1])) +
    '\n';
}

console.log(result);

function GCD(number1, number2) {
  if (number2 === 0) {
    return number1;
  } else {
    return GCD(number2, number1 % number2);
  }
}

function LCM(numbersMultiple, GCD) {
  return numbersMultiple / GCD;
}
