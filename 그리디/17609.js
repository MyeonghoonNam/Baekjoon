const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
abba
summuus
xabba
xabbay
comcom
comwwmoc
comwwtmoc`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let T = Number(input());
  let result = "";

  const isPalindrome = (str) => {
    return str === str.split("").reverse().join("");
  };

  while (T--) {
    const str = input();

    if (isPalindrome(str)) {
      result += "0\n";
    } else {
      for (let i = 0; i < parseInt(str.length / 2); i++) {
        if (str[i] !== str[str.length - i - 1]) {
          const frontOneCharRemoveStr =
            str.slice(0, i) + str.slice(i + 1, str.length);
          const backOneCharRemoveStr =
            str.slice(0, str.length - i - 1) +
            str.slice(str.length - i, str.length);

          if (
            isPalindrome(frontOneCharRemoveStr) ||
            isPalindrome(backOneCharRemoveStr)
          ) {
            result += "1\n";
            break;
          }

          result += "2\n";
          break;
        }
      }
    }
  }

  return result;
};

console.log(solution());
