const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const N = parseInt(line);
  Hanoi(N, 1, 3, 2);
  console.log(moveCount);
  console.log(move);
  rl.close();
})
  .on('close', () => {
    process.exit();
  });

let moveCount = 0;
let move = '';
function Hanoi(num, start, end, help){
  if(num === 1){
    move += `${start} ${end}\n`;
    moveCount++;
    return;
  }

  Hanoi(num - 1, start, help, end);
  move += `${start} ${end}\n`;
  moveCount++;
  Hanoi(num - 1, help, end, start);
}