const input = "55-50+40";

let list = input.split('-');

solve(list);

function solve(list){

  let tmp = [];

  for(let i of list){
    let count = 0;
    let n = i.split('+');

    for(let j of n){
      count += parseInt(j);
    }

    tmp.push(count);
  }

  let result = tmp.reduce((acc, cur) => {
    return acc - cur;
  });

  console.log(result);
  
}