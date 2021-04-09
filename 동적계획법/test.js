const input = ["6","10 20 10 30 20 50"];

const N = input[0];
const numbers = input[1].split(' ').map(el => parseInt(el));

const list = [numbers[0]];

for(let i = 1; i < N; i++){
  const num = numbers[i];

  if(list[list.length - 1] < num){
    list.push(num);
  } else {
    const idx = binarySearch(num);
    list[idx] = num;
  }
}

console.log(list.length);

function binarySearch(target){
  let low = 0;
  let high = list.length - 1; // 5;

  while(low < high) {
    let mid = Math.floor((low + high) / 2);
    let targetIdx = mid

    if(list[mid] === target){
      return targetIdx;
    } else if(list[mid] < target){
      low = mid + 1;
    } else {
      // list[mid] > target
      high = mid;
    }
  }

  return high;
}