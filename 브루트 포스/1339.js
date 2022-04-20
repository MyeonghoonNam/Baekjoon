const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
A
B
C
D
E
F
G
H
I
J`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const alphabet = new Array(26).fill(0); // 단어가 나오는 횟수 카운팅
  const alphabet_total = []; // 자리별 알파벳 가중치를 저장

  for (let i = 0; i < N; i++) {
    const word = input();
    let cnt = 1;

    for (let j = word.length - 1; j >= 0; j--) {
      alphabet[word[j].charCodeAt(0) - "A".charCodeAt(0)] += cnt;
      cnt *= 10;
    }
  }

  alphabet.forEach((cnt) => {
    if (cnt !== 0) {
      alphabet_total.push(cnt);
    }
  });

  alphabet_total.sort((a, b) => b - a);

  let number = 9;
  let result = 0;
  alphabet_total.forEach((value) => {
    result += value * number;
    number -= 1;
  });

  return result;
};

console.log(solution());
