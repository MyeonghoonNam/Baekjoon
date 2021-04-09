const input = ["6","10 20 10 30 20 50"];

const N = input[0];
const numbers = input[1].split(' ').map(el => parseInt(el));

const list = [numbers[0]];
const indexArr = [1];

for(let i = 1; i < N; i++){
  if(list[list.length - 1] < numbers[i]){
    list.push(numbers[i]);
    indexArr[i] = list.length;
  } else {
    let idx = binarySearch(numbers[i]);
    list[idx] = numbers[i];
    indexArr[i] = idx + 1;
  }
}

const result = [];
let idx = list.length;
for(let i = N - 1; i >= 0; i--){
  if(indexArr[i] === idx){
    result.unshift(numbers[i]);
    idx--;
  }
}

console.log(result.length);
console.log(result.join(' '));

function binarySearch(target){
  let low = 0;
  let high = list.length - 1;

  while(low < high){
    let mid = Math.floor((low + high) / 2);
    let targetIdx = mid;
    if(list[mid] === target){
      return targetIdx;
    } else if(list[mid] < target){
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return high;
}