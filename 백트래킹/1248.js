// const fs = require('fs');
// const stdin = (
//   process.platform === 'linux'
//     ? fs.readFileSync('/dev/stdin').toString()
//     : `4
// -+0++++--+`
// ).split('\n');

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// Solution();

// function Solution() {
//   const N = Number(input());
//   const operator = Array.from(new Array(N), () => new Array());
//   const selected = new Array(10).fill(0);

//   const inputArr = input();
//   for (let i = 0; i < N; i++) {
//     for (let j = i; j < N; j++) {
//       operator[i][j] = inputArr[j];
//     }
//   }

//   const Check = (idx) => {
//     let sum = 0;

//     for (let i = idx; i >= 0; i--) {
//       sum += selected[i];

//       if (operator[i][idx] === '+' && sum <= 0) return false;
//       if (operator[i][idx] === '-' && sum >= 0) return false;
//       if (operator[i][idx] === '0' && sum !== 0) return false;
//     }

//     return true;
//   };

//   const Dfs = (cnt) => {
//     if (cnt === N) {
//       for (let i = 0; i < cnt; i++) {
//         process.stdout.write(selected[i] + ' ');
//       }

//       return;
//     }

//     for (let i = -10; i <= 10; i++) {
//       selected[cnt] = i;
//       if (Check(cnt)) {
//         Dfs(cnt + 1);
//       }
//     }
//   };

//   Dfs(0);
// }
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const n = Number(input.shift());
  const arr = input.shift().split('');
  const map = [];

  let idx = 0;

  for (let i = 0; i < n; i++) {
    map.push(new Array(n).fill(null));
    for (let j = i; j < n; j++) {
      map[i][j] = arr[idx++];
    }
  }

  const visited = [];
  const visit = [];

  dfs(0);

  function dfs(cnt) {
    if (cnt === n) {
      console.log(visit.join(' '));
      process.exit();
    }
    for (let i = 0; i < 21; i++) {
      //if(visited[i]) continue;
      //visited[i] = true;
      visit.push(i - 10);

      const flag = solution();

      if (flag === true) {
        //console.log(flag);
        //console.log(visit);
        dfs(cnt + 1);
      }
      visit.pop();
      //visited[i] = false;
    }
  }

  function solution() {
    for (let i = 0; i < visit.length; i++) {
      let sum = 0;
      for (let j = i; j < visit.length; j++) {
        sum += visit[j];
        let check = sum === 0 ? '0' : sum < 0 ? '-' : '+';
        if (check !== map[i][j]) return false;
      }
    }
    return true;
  }
  process.exit();
});
