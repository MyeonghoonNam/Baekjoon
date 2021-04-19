const input = [[4], [9, 5, 4, 8]];

const N = input[0][0];
const numbers = input[1];
const stack = [];
let top = stack.length - 1;

for (let i = 0; i < N; i++) {
  NGE(i);
}

for (let i = top; i >= 0; i--) {
  numbers[stack.pop()] = -1;
}

console.log(numbers.join(' '));

function NGE(idx) {
  while (top !== -1 && numbers[stack[top]] < numbers[idx]) {
    numbers[stack.pop()] = numbers[idx];
    top--;
  }

  stack.push(idx);
  top++;
}
