const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 4
1 2 1
3 2 1
1 3 5
2 3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [V, E] = input().split(" ").map(Number);
  const graph = Array.from(new Array(V + 1), () =>
    new Array(V + 1).fill(Infinity)
  );

  for (let i = 0; i < E; i++) {
    const [start, end, cost] = input().split(" ").map(Number);
    graph[start][end] = cost;
  }

  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      if (i === j) graph[i][j] = 0;
    }
  }

  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      for (let k = 1; k <= V; k++) {
        if (i === j) continue;

        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  let dist = Infinity;

  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      if (i === j) continue;

      if (graph[i][j] !== Infinity && graph[j][i] !== Infinity)
        dist = Math.min(dist, graph[i][j] + graph[j][i]);
    }
  }

  const result = dist === Infinity ? -1 : dist;

  return result;
};

console.log(solution());

// const fs = require("fs");
// const stdin = (
//   process.platform === "linux"
//     ? fs.readFileSync("/dev/stdin").toString()
//     : `3 4
// 1 2 1
// 3 2 1
// 1 3 5
// 2 3 2`
// ).split("\n");

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// /**
//  * V개의 마을, E개의 일방 통행 도로
//  *
//  * 요구사항: 도로의 길이의 합이 가장 작은 사이클 도출, 사이클이 없는 경우 -1 출력
//  * 두 마을을 왕복하는 경우도 사이클에 해당
//  *
//  */
// const solution = () => {
//   const [V, E] = input().split(" ").map(Number);
//   const map = Array.from(new Array(V + 1), () =>
//     new Array(V + 1).fill(Infinity)
//   );

//   for (let i = 0; i < E; i++) {
//     const [start, end, dist] = input().split(" ").map(Number);

//     map[start][end] = dist;
//   }

//   for (let i = 1; i <= V; i++) {
//     for (let j = 1; j <= V; j++) {
//       if (i === j) map[i][j] = 0;
//     }
//   }

//   const floyd = () => {
//     for (let k = 1; k <= V; k++) {
//       for (let i = 1; i <= V; i++) {
//         for (let j = 1; j <= V; j++) {
//           map[i][j] = Math.min(map[i][j], map[i][k] + map[k][j]);
//         }
//       }
//     }
//   };

//   const process = () => {
//     floyd();

//     let temp = Infinity;
//     for (let i = 1; i <= V; i++) {
//       for (let j = 1; j <= V; j++) {
//         if (i === j) continue;

//         if (map[i][j] !== Infinity && map[j][i] !== Infinity) {
//           temp = Math.min(temp, map[i][j] + map[j][i]);
//         }
//       }
//     }

//     return temp === Infinity ? -1 : temp;
//   };

//   const result = process();
//   return result;
// };

// console.log(solution());
