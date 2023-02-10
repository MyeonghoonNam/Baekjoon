const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 7
20 15 10 17`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const trees = input().split(" ").map(Number);

  let low = 0;
  let high = Math.max(...trees);

  while (low <= high) {
    const height = parseInt((low + high) / 2);
    let lumberHeightSum = 0;

    for (let i = 0; i < N; i++) {
      const diff = trees[i] - height;

      if (diff > 0) {
        lumberHeightSum += diff;
      }
    }

    if (lumberHeightSum >= M) {
      low = height + 1;
    } else {
      high = height - 1;
    }
  }

  return high;
};

console.log(solution());

// const fs = require('fs');
// const stdin = (
//   process.platform === 'linux'
//     ? fs.readFileSync('/dev/stdin').toString()
//     : `5 20
// 4 42 40 26 46`
// ).split('\n');

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// console.time();
// /*
// 나무 M 미터 필요
// 절단기에 높이 H 지정 => 톱날이 지면 H 미터 위로 위치 => 그 위치 나무 모두 절단
// ex H = 15, input : 20, 15, 10, 17 => output: 15, 15, 10, 2
// 나무 5 + 2 = 7을 들고간다.
// 필요한 만큼의 나무만 가져간다 할 때 절단기의 최댓값을 구하기
// */
// const [N, M] = input().split(' ').map(Number); // 나무 수, 필요한 나무의 최소 길이 합
// // const trees = input().split(' ').map(Number).sort((a, b) => a -b); // 나무들의 높이 정보
// const trees = input().split(' ').map(Number); // 나무들의 높이 정보
// // let result = 0; // 절단기 설정 높이의 최댓값 반환

// let low = 0;
// // let high = trees[trees.length - 1];
// let high = Math.max(...trees); // 더 유리한 속도 하지만 백준 저지는 콜스택 오류가 나는 코드이다 ;;;;;

// while(low <= high) {
//   const mid = Math.floor((low + high) / 2);
//   let totalCutTreeLength = 0;

//   // 자른 나무길이의 합 구하기
//   for(let i = 0; i < N; i++) {
//     const treeHeight = trees[i];

//     if(mid < treeHeight) {
//       const cutTreeLength = treeHeight - mid; // 자른 나무 길이

//       totalCutTreeLength += cutTreeLength;
//     }
//   }

//   if(totalCutTreeLength >= M) {
//     low = mid + 1;
//   } else {
//     high = mid - 1;
//   }
// }

// console.log(high);
// console.timeEnd();
