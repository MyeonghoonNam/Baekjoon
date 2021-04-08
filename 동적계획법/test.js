const a = [1, [2, 3, 4, 5]];
console.log(a);
const b = a[1];
console.log(b);

b.sort((a, b) => b - a);

console.log(a);
console.log(b);