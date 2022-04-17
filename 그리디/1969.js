const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 10
ATGTTACCAT
AAGTTACGAT
AACAAAGCAA
AAGTTACCTT
AAGTTACCAA
TACTTACCAA`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const getHammingDistance = (a, b, length) => {
    let diff = 0;

    for (let i = 0; i < length; i++) {
      if (a[i] !== b[i]) diff += 1;
    }

    return diff;
  };

  const getMaxChar = (count_char) => {
    let max_value = 0;
    let max_idx = 0;

    for (let i = 0; i < 4; i++) {
      if (count_char[i] > max_value) {
        max_value = count_char[i];
        max_idx = i;
      }
    }

    if (max_idx === 0) {
      return "A";
    } else if (max_idx === 1) {
      return "C";
    } else if (max_idx === 2) {
      return "G";
    } else {
      return "T";
    }
  };

  const [N, M] = input().split(" ").map(Number);
  const DNA = [];
  let s = "";
  let diff = 0;

  for (let i = 0; i < N; i++) {
    DNA.push(input());
  }

  for (let i = 0; i < M; i++) {
    const count_char = [0, 0, 0, 0]; // A, C, G, T

    for (let j = 0; j < N; j++) {
      if (DNA[j][i] === "A") {
        count_char[0] += 1;
      } else if (DNA[j][i] === "C") {
        count_char[1] += 1;
      } else if (DNA[j][i] === "G") {
        count_char[2] += 1;
      } else {
        count_char[3] += 1;
      }
    }

    s += getMaxChar(count_char);
  }

  for (let i = 0; i < N; i++) {
    diff += getHammingDistance(s, DNA[i], M);
  }

  return `${s}\n${diff}`;
};

console.log(solution());
