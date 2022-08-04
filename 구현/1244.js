const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8
0 1 0 1 0 0 0 1
2
1 3
2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const setSwitchState = (number) => {
    switchState[number] = Number(!switchState[number]);
  };

  const setSwitchMen = (number) => {
    for (let i = number; i <= N; i += number) {
      setSwitchState(i);
    }
  };

  const setSwitchWomen = (number) => {
    setSwitchState(number);
    let start = number - 1;
    let end = number + 1;

    while (
      checkRangeSwitch(start, end) &&
      switchState[start] === switchState[end]
    ) {
      setSwitchState(start);
      setSwitchState(end);
      start--;
      end++;
    }
  };

  const checkRangeSwitch = (start, end) => {
    if (start >= 1 && end <= N) return true;
    else return false;
  };

  const N = Number(input());
  const switchState = [, ...input().split(" ").map(Number)];
  let S = Number(input());

  while (S--) {
    const [sex, number] = input().split(" ").map(Number);

    switch (sex) {
      case 1:
        setSwitchMen(number);
        break;
      case 2:
        setSwitchWomen(number);
        break;
    }
  }

  let result = "";
  for (let i = 1; i <= N; i++) {
    result += switchState[i];
    result += i % 20 === 0 ? "\n" : " ";
  }

  return result;
};

console.log(solution());
