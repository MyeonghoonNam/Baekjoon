// const input = ['1 16 16'];
// const input = ['1 1 1'];
// const input = ['1 2 3'];
const input = ['15 28 19'];

console.log(Solution(input));

function Solution(input) {
  const [E, S, M] = input[0].split(' ').map(Number);

  let year = 1;
  while (1) {
    if (
      (year - E) % 15 === 0 &&
      (year - S) % 28 === 0 &&
      (year - M) % 19 === 0
    ) {
      break;
    }

    year++;
  }

  return year;
}
