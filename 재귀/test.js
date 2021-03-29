const result = [['*'], ['*', '*']];


result[0].push(' ');
console.log(result);
let join = '';

for(let i = 0; i < result.length; i++){
  join += result[i].join('');
}
console.log(join);

const result2 = result.reduce((acc, cur) => {
  return acc + cur;
})

console.log(result2);