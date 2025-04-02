const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
h*n
huhovdjestvarnomozedocisvastan
honijezakon
atila
je
bio
hun`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let t = Number(input());
  const result = [];
  const [prefix, suffix] = input().split("*");
  const reg = new RegExp(`^${prefix}[a-z]*${suffix}$`);

  while (t--) {
    const string = input();
    result.push(reg.test(string) ? "DA" : "NE");
  }

  return result.join("\n");
};

console.log(solution());
