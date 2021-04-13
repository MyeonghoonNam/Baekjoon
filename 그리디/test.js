const input = [
  "10 4200",
  "1",
  "5",
  "10",
  "50",
  "100",
  "500",
  "1000",
  "5000",
  "10000",
  "50000"
]

const tmp = input[0].split(' ').map(el => Number(el));

const N = tmp[0];
const K = tmp[1];
const coins = input.slice(1).map(el => Number(el));

coins.sort((a, b) => b - a);

solve(N, K, coins);

function solve(N, K, coins){
  let count = 0;

  for(let el of coins){
    if(K === 0){
      break;
    }

    if(el <= K){
      count += parseInt(K / el);
      K = K % el;
    }
  }

  console.log(count);
}