function d(n) {
  let sum = n;

  while(1){
    if(n === 0) break;

    sum += n % 10;
    n = parseInt(n / 10);
  }

  return sum;
}

const N = 10000;
const selfNumCheckArr = new Array(N);
selfNumCheckArr.fill(false);

for(let i = 0 ; i < N ; i++){
  let idx = d(i + 1);

  if(idx <= 10000){
    selfNumCheckArr[idx - 1] = true;
  }
}

for(let i = 1 ; i < N ; i++){
  if(!selfNumCheckArr[i - 1]){
    console.log(i);
  }
}