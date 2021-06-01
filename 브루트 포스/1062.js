'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `9 8
antabtica
antaxtica
antadtica
antaetica
antaftica
antagtica
antahtica
antajtica
antaktica`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

// 비트마스크 풀이
function Solution() {
  const [N, K] = input().split(' ').map(Number);

  if (K < 5 || K === 26) return K === 26 ? N : 0;

  const word = [];
  let alphabet = 0;
  let result = 0;

  for (let i = 0; i < N; i++) {
    word[i] = input();
  }

  const canReadWordCount = () => {
    let flag = true;
    let count = 0;

    for (let i = 0; i < N; i++) {
      const str = word[i];
      flag = true;

      for (let j = 4; j < str.length - 4; j++) {
        if (!(alphabet & (1 << (str[j].charCodeAt() - 'a'.charCodeAt())))) {
          flag = false;
          break;
        }
      }

      if (flag) count++;
    }

    return count;
  };

  const dfs = (idx, cnt) => {
    if (K - 5 === cnt) {
      result = Math.max(result, canReadWordCount());
      return;
    }

    for (let i = idx; i < 26; i++) {
      if (!(alphabet & (1 << i))) {
        alphabet |= 1 << i;
        dfs(i, cnt + 1);
        alphabet &= ~(1 << i);
      }
    }
  };

  alphabet |= 1 << ('a'.charCodeAt() - 'a'.charCodeAt());
  alphabet |= 1 << ('n'.charCodeAt() - 'a'.charCodeAt());
  alphabet |= 1 << ('t'.charCodeAt() - 'a'.charCodeAt());
  alphabet |= 1 << ('i'.charCodeAt() - 'a'.charCodeAt());
  alphabet |= 1 << ('c'.charCodeAt() - 'a'.charCodeAt());

  dfs(0, 0);

  return result;
}

// // 브루트포스 풀이
// function Solution() {
//   const [N, K] = input().split(' ').map(Number);

//   if (K < 5 || K === 26) return K === 26 ? N : 0;

//   const alphabet = new Array(26).fill(false);
//   const word = [];
//   let result = 0;

//   for (let i = 0; i < N; i++) {
//     word.push(input());
//   }

//   const canReadWordCount = () => {
//     let flag = true;
//     let count = 0;

//     for (let i = 0; i < word.length; i++) {
//       const str = word[i];
//       flag = true;

//       for (let j = 0; j < str.length; j++) {
//         if (!alphabet[str[j].charCodeAt() - 'a'.charCodeAt()]) {
//           flag = false;
//           break;
//         }
//       }

//       if (flag) count++;
//     }

//     return count;
//   };

//   const dfs = (idx, cnt) => {
//     if (K - 5 === cnt) {
//       result = Math.max(result, canReadWordCount());
//       return;
//     }

//     for (let i = idx; i < 26; i++) {
//       if (!alphabet[i]) {
//         alphabet[i] = true;
//         dfs(i, cnt + 1);
//         alphabet[i] = false;
//       }
//     }
//   };

//   alphabet['a'.charCodeAt() - 'a'.charCodeAt()] = true;
//   alphabet['n'.charCodeAt() - 'a'.charCodeAt()] = true;
//   alphabet['t'.charCodeAt() - 'a'.charCodeAt()] = true;
//   alphabet['i'.charCodeAt() - 'a'.charCodeAt()] = true;
//   alphabet['c'.charCodeAt() - 'a'.charCodeAt()] = true;

//   dfs(0, 0);

//   return result;
// }
