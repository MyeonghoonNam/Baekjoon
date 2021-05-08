// const weights = [60, 70, 60];
// const head2head = ['NNN', 'NNN', 'NNN'];

// console.log(solution(weights, head2head));

// function solution(weights, head2head) {
//   const N = weights.length;
//   const winCountArr = [];
//   const overWinCountArr = [];

//   for (let i = 0; i < N; i++) {
//     let totalCount = 0;
//     let winCount = 0;
//     let overWinCount = 0;

//     for (let j = 0; j < N; j++) {
//       if (head2head[i][j] === 'W') {
//         winCount++;

//         if (weights[i] < weights[j]) {
//           overWinCount++;
//         }
//       } else if (head2head[i][j] === 'N') {
//         continue;
//       }

//       totalCount++;
//     }

//     winCountArr[i] = ((winCount * 100) / totalCount).toFixed(2);
//     overWinCountArr[i] = overWinCount;
//   }

//   const playersInfo = [];
//   for (let i = 0; i < N; i++) {
//     playersInfo[i] = [winCountArr[i], overWinCountArr[i], weights[i], i + 1];
//   }

//   playersInfo.sort((a, b) => {
//     return b[0] - a[0] || b[1] - a[1] || b[2] - a[2] || a[3] - b[3];
//   });

//   const result = [];
//   for (let i = 0; i < N; i++) {
//     result.push(playersInfo[i][3]);
//   }

//   return result;
// }

// const leave = 4;
// const day = 'FRI';
// const holidays = [6, 21, 23, 27, 28];

// console.log(solution(leave, day, holidays));

// function solution(leave, day, holidays) {
//   let leaveCount = leave;
//   const dp = [0];

//   if(leave === 30) {
//     return 30;
//   }

//   if(day === "SUN") {
//     const sunArr = [1, 8, 15, 22, 29];
//     const satArr = [7, 14, 21, 28];

//     for(let i = 1; i <= 30; i++){
//       dp[i] = 1;

//       for(let j = 1; j < i; j++){
//         if()
//       }
//     }

//   } else if(day === "MON") {

//   } else if(day === "TUE") {

//   } else if(day === "WED") {

//   } else if(day === "THU") {

//   } else if(day === "FRI") {

//   } else if(day === "SAT") {

//   }
// }

const prices = [4, 3, 2, 1, 2, 3, 4, 3, 2, 1];
solution(prices);
function solution(prices) {
  let count = 0;
  const result = [];
  const flagArr = [];
  let isflag;
  if (prices[0] > prices[1]) {
    isflag = false;
  } else {
    isflag = true;
  }

  for (let i = 0; i < prices.length - 1; i++) {
    if (!isflag) {
      if (prices[i] < prices[i + 1]) {
        result.push(count);
        flagArr.push(false);
        isflag = true;
        count = 1;
        continue;
      } else {
        count++;

        if (i === prices.length - 1) {
          result.push(count);
          continue;
        }
      }
    } else if (isflag) {
      if (prices[i] > prices[i + 1]) {
        result.push(count);
        flagArr.push(true);
        isflag = false;
        count = 1;
        continue;
      } else {
        count++;

        if (i === prices.length - 1) {
          result.push(count);
          continue;
        }
      }
    }
  }

  console.log(result);
  for (let i = 0; i < flagArr.length; i++) {
    if (flagArr[i] === false) {
      result[i] = -Math.min(result[i], result[i + 1]);
    } else if (flagArr[i] === true) {
      result[i] = Math.min(result[i], result[i + 1]);
    }
  }

  console.log(result);
  return result;
}
