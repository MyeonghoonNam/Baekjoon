// const input = [
//   6,
//   '(())())',
//   '(((()())()',
//   '(()())((()))',
//   '((()()(()))(((())))()',
//   '()()()()(()()())()',
//   '(()((())()(',
// ];

const input = [3, '((', '))', '())(()'];

const T = input[0];
input.shift();

for (let i = 0; i < T; i++) {
  console.log(solve(input[i]));
}

// '(' 기호 일 때만 스택에 push, 아닌 경우는 pop
// 첫 기호가 ')'를 방지해 스택길이가 0일 때 ')' 기호를 만나면 'NO' 출력
function solve(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '(') {
      stack.push(char);
    } else if (stack.length === 0) {
      return 'NO';
    } else {
      stack.pop();
    }
  }

  if (stack.length === 0) {
    // 모든 괄호의 짝이 맞다.
    return 'YES';
  } else {
    return 'NO';
  }
}
