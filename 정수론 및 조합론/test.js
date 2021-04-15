const input = [
  [8, 16],
  [32, 4],
  [17, 5],
];

let result = '';
for (let numbers of input) {
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);

  if (max % min === 0) {
    if (max === numbers[0]) {
      result += 'multiple\n';
    } else {
      result += 'factor\n';
    }
  } else {
    result += 'neither\n';
  }
}

console.log(result);
