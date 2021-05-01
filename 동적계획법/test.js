const input = ['20', '7', '23', '19', '10', '15', '25', '8', '13'];

Solution(input);

function Solution(input) {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    console.log(Number(input[i]));
    sum += Number(input[i]);
    console.log(sum);
    return;
  }

  console.log(sum);
}
