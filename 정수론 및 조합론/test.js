let number = 10;

let count = 0;
while (number >= 5) {
  count += parseInt(number / 5);
  number /= 5;
}

console.log(count);
