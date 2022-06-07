const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
3
Fred Barney
Barney Betty
Betty Wilma
3
Fred Barney
Betty Wilma
Barney Betty`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const findParent = (parent, value) => {
    if (parent[value] !== value) {
      parent[value] = findParent(parent, parent[value]);
    }

    return parent[value];
  };

  const unionParent = (parent, start, end, map_size) => {
    start = findParent(parent, start);
    end = findParent(parent, end);

    if (start !== end) {
      parent[end] = parent[start];
      map_size[start] += map_size[end];
    }

    return map_size[start];
  };

  const process = () => {
    let T = Number(input());
    const result = [];

    while (T--) {
      const F = Number(input());
      const parent_table = new Array(F * 2);
      const map_size = new Array(F * 2);

      for (let i = 0; i < F * 2; i++) {
        parent_table[i] = i;
        map_size[i] = 1;
      }

      const map = new Map();
      let idx = 0;

      for (let i = 0; i < F; i++) {
        const [name1, name2] = input().split(" ");

        if (!map.has(name1)) {
          map.set(name1, idx++);
        }

        if (!map.has(name2)) {
          map.set(name2, idx++);
        }

        result.push(
          unionParent(parent_table, map.get(name1), map.get(name2), map_size)
        );
      }
    }

    return result.join("\n");
  };

  const result = process();
  return result;
};

console.log(solution());
