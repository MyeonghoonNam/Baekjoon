// const input = [8, 4, 3, 6, 8, 7, 5, 2, 1];
const input = [5, 1, 2, 5, 3, 4];

const N = input[0];
input.shift();

const stack = [];

let result = '';
let startNum = 0; // 1을 비교하기 위해 0으로 시작
for (let i = 0; i < N; i++) {
  const temp = input[i];

  if (temp > startNum) {
    for (let j = startNum + 1; j <= temp; j++) {
      stack.push(j);
      result += '+\n';
    }

    startNum = temp;
  } else if (stack[stack.length - 1] !== temp) {
    console.log('NO');

    return;
  }

  stack.pop();
  result += '-\n';
}

console.log(result);
