const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `AABB`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const name = input();
  const alphabetTable = new Array(26).fill(0);
  let result = "";

  const isPossiblePalindrome = () => {
    let oddCount = 0;

    for (let i = 0; i < 26; i++) {
      if (alphabetTable[i] % 2 === 1) {
        oddCount++;
      }
    }

    return oddCount > 1 ? false : true;
  };

  for (let i = 0; i < name.length; i++) {
    alphabetTable[name[i].charCodeAt() - "A".charCodeAt()]++;
  }

  if (!isPossiblePalindrome()) {
    result = "I'm Sorry Hansoo";
    return result;
  }

  for (let i = 0; i < 26; i++) {
    let halfIndex = parseInt(alphabetTable[i] / 2);

    for (let j = 0; j < halfIndex; j++) {
      result += String.fromCharCode(i + "A".charCodeAt());
    }
  }

  for (let i = 0; i < 26; i++) {
    if (alphabetTable[i] % 2 !== 0) {
      // 홀수개의 알파벳이 존재하는 경우
      result += String.fromCharCode(i + "A".charCodeAt());
    }
  }

  for (let i = 25; i >= 0; i--) {
    let halfIndex = parseInt(alphabetTable[i] / 2);

    for (let j = 0; j < halfIndex; j++) {
      result += String.fromCharCode(i + "A".charCodeAt());
    }
  }

  return result;
};

console.log(solution());
