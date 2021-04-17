const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T = null;
let N = null;
let obj = {};

rl.on('line', function (line) {
  if (T === null) {
    T = +line;
  } else if (T > 0) {
    if (N === null) {
      N = +line;
      obj = {};
      if (N === 0) {
        N = null;
        T--;
        console.log(0);
      }
      if (T === 0) {
        rl.close();
      }
    } else {
      let [_, category] = line.trim().split(' ');
      if (category in obj) {
        obj[category]++;
      } else {
        obj[category] = 1;
      }
      N--;
      if (N === 0) {
        let sum = Object.keys(obj).reduce((acc, val) => {
          if (acc == 0) {
            acc = obj[val] + 1;
          } else {
            acc *= obj[val] + 1;
          }
          return acc;
        }, 0);
        if (sum > 0) {
          sum--;
        }
        console.log(sum);
        N = null;
        T--;
      }
      if (T === 0) {
        rl.close();
      }
    }
  } else {
    rl.close();
  }
}).on('close', function () {
  rl.close();
});
