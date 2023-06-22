const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
6 3 2 10 10 10 -10 -10 7 3
8
10 9 -5 2 3 4 5 -10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 5차 해결
const solution = () => {
  const result = [];
  const N = Number(input());
  const cards = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  const M = Number(input());
  const findCards = input().split(" ").map(Number);

  const lowerBound = (target) => {
    let start = 0;
    let end = N;

    while (start < end) {
      const mid = parseInt((start + end) / 2);

      if (cards[mid] >= target) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }

    return end;
  };

  const upperBound = (target) => {
    let start = 0;
    let end = N;

    while (start < end) {
      const mid = parseInt((start + end) / 2);

      if (cards[mid] > target) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }

    return end;
  };

  for (let i = 0; i < M; i += 1) {
    const target = findCards[i];
    const count = upperBound(target) - lowerBound(target);

    result.push(count);
  }

  return result.join(" ");
};

console.log(solution());

// 4차 해결
// const solution = () => {
//   const N = Number(input());
//   const numbers = input()
//     .split(" ")
//     .map(Number)
//     .sort((a, b) => a - b);

//   const M = Number(input());
//   const findNumbers = input().split(" ").map(Number);

//   const lowerBound = (target) => {
//     let start = 0;
//     let end = N;

//     while (start < end) {
//       const mid = parseInt((start + end) / 2);

//       if (numbers[mid] >= target) {
//         end = mid;
//       } else {
//         start = mid + 1;
//       }
//     }

//     return end;
//   };

//   const upperBound = (target) => {
//     let start = 0;
//     let end = N;

//     while (start < end) {
//       const mid = parseInt((start + end) / 2);

//       if (numbers[mid] > target) {
//         end = mid;
//       } else {
//         start = mid + 1;
//       }
//     }

//     return end;
//   };

//   const result = [];

//   for (let i = 0; i < M; i++) {
//     const target = findNumbers[i];
//     const start = lowerBound(target);
//     const end = upperBound(target);

//     result.push(end - start);
//   }

//   return result.join(" ");
// };

// console.log(solution());

// 3차 해결
// const solution = () => {
//   const result = [];
//   const N = Number(input());
//   const numbers = input()
//     .split(" ")
//     .map(Number)
//     .sort((a, b) => a - b);
//   const M = Number(input());
//   const findNumbers = input().split(" ").map(Number);

//   const lowerBound = (arr, target) => {
//     let start = 0;
//     let end = N;
//     while (start < end) {
//       const mid = parseInt((start + end) / 2);
//       if (arr[mid] >= target) {
//         end = mid;
//       } else {
//         start = mid + 1;
//       }
//     }
//     return end;
//   };

//   const upperBound = (arr, target) => {
//     let start = 0;
//     let end = N;
//     while (start < end) {
//       const mid = parseInt((start + end) / 2);
//       if (arr[mid] > target) {
//         end = mid;
//       } else {
//         start = mid + 1;
//       }
//     }
//     return end;
//   };

//   for (let i = 0; i < M; i++) {
//     const target = findNumbers[i];
//     const firstIndex = lowerBound(numbers, target);
//     const lastIndex = upperBound(numbers, target);
//     const count = lastIndex - firstIndex;

//     result.push(count);
//   }

//   return result.join(" ");
// };

// 2차 해결
// const solution = () => {
//   const result = [];

//   const N = Number(input());
//   const numbers = input()
//     .split(" ")
//     .map(Number)
//     .sort((a, b) => a - b);

//   const M = Number(input());
//   const findNumbers = input().split(" ").map(Number);

//   const lowerBound = (arr, target) => {
//     let start = 0;
//     let end = N;

//     while (start < end) {
//       const mid = parseInt((start + end) / 2);

//       if (arr[mid] >= target) {
//         end = mid;
//       } else {
//         start = mid + 1;
//       }
//     }

//     return end;
//   };

//   const upperBound = (arr, target) => {
//     let start = 0;
//     let end = N;

//     while (start < end) {
//       const mid = parseInt((start + end) / 2);

//       if (arr[mid] > target) {
//         end = mid;
//       } else {
//         start = mid + 1;
//       }
//     }

//     return end;
//   };

//   for (let i = 0; i < M; i++) {
//     const target = findNumbers[i];

//     const firstIndex = lowerBound(numbers, target);
//     const lastIndex = upperBound(numbers, target);

//     const count = lastIndex - firstIndex;

//     result.push(count);
//   }

//   return result.join(" ");
// };

// 1차 해결
// const solution = () => {
//   const N = Number(input());
//   const numbers = input()
//     .split(" ")
//     .map(Number)
//     .sort((a, b) => a - b);

//   const M = Number(input());
//   const findNumbers = input().split(" ").map(Number);

//   const result = [];

//   const lowerBound = (findNumber) => {
//     let low = 0;
//     let high = N;

//     while (low <= high) {
//       const mid = parseInt((low + high) / 2);

//       if (numbers[mid] < findNumber) {
//         low = mid + 1;
//       } else {
//         high = mid - 1;
//       }
//     }

//     return low;
//   };

//   const upperBound = (findNumber) => {
//     let low = 0;
//     let high = N;

//     while (low <= high) {
//       const mid = parseInt((low + high) / 2);

//       if (numbers[mid] <= findNumber) {
//         low = mid + 1;
//       } else {
//         high = mid - 1;
//       }
//     }

//     return low;
//   };

//   for (let i = 0; i < M; i++) {
//     const findNumber = findNumbers[i];
//     const firstIndex = lowerBound(findNumber);
//     const lastIndex = upperBound(findNumber);

//     result.push(lastIndex - firstIndex);
//   }

//   return result.join(" ");
// };

// console.log(solution());
