const input = [24, 18];
const firstNumber = input[0];
const secondNumber = input[1];

// 첫 번째 수의 약수
const factorsOf_FirstNumber = [];

for (let i = 1; i <= firstNumber; i++) {
  if (firstNumber % i === 0) {
    factorsOf_FirstNumber.push(i);
  }
}

// 두 번째 수의 약수
const factorsOf_SecondNumber = [];

for (let i = 1; i <= secondNumber; i++) {
  if (secondNumber % i === 0) {
    factorsOf_SecondNumber.push(i);
  }
}

// 두 수의 공약수
const CommonDivisor = factorsOf_FirstNumber.filter((number) => {
  return factorsOf_SecondNumber.includes(number);
});

// 최대 공약수
const greatestCommonDivisor = Math.max(...CommonDivisor);

// 최소 공배수
const leastCommonMultiple =
  greatestCommonDivisor *
  (firstNumber / greatestCommonDivisor) *
  (secondNumber / greatestCommonDivisor);

let result = `${greatestCommonDivisor}\n${leastCommonMultiple}`;

console.log(result);
