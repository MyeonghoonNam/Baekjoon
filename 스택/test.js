const input = [4, 3, 0, 4, 0];

const N = input[0];
input.shift();

const resultArr = [];
for (let i = 0; i < N; i++) {
  if (input[i] === 0) {
    resultArr.pop();
  } else {
    resultArr.push(input[i]);
  }
}

if (resultArr.length === 0) {
  console.log(0);
} else {
  const result = resultArr.reduce((acc, cur) => {
    return acc + cur;
  });

  console.log(result);
}
