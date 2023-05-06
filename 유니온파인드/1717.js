const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const parentTable = new Array(N + 1);
  const result = [];

  for (let i = 0; i <= N; i++) {
    parentTable[i] = i;
  }

  const findParent = (parent, value) => {
    if (parent[value] !== value) {
      parent[value] = findParent(parent, parent[value]);
    }

    return parent[value];
  };

  const unionParent = (parent, start, end) => {
    start = findParent(parent, start);
    end = findParent(parent, end);

    if (start < end) {
      parent[end] = start;
    } else {
      parent[start] = end;
    }
  };

  for (let i = 1; i <= M; i++) {
    const [mod, start, end] = input[i].split(" ").map(Number);

    if (mod === 0) {
      unionParent(parentTable, start, end);
    } else if (mod === 1) {
      const isInclude =
        findParent(parentTable, start) === findParent(parentTable, end);

      result.push(isInclude ? "YES" : "NO");
    }
  }

  console.log(result.join("\n"));
};
