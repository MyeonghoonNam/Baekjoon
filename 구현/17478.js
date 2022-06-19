const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  let result = "";
  const recursiveFunction = (count, number) => {
    if (count === number) {
      for (let i = 0; i < count * 4; i++) {
        result += "_";
      }

      result += '"재귀함수가 뭔가요?"\n';

      for (let i = 0; i < count * 4; i++) {
        result += "_";
      }

      result += '"재귀함수는 자기 자신을 호출하는 함수라네"\n';

      for (let i = 0; i < count * 4; i++) {
        result += "_";
      }

      result += "라고 답변하였지.\n";
      return;
    }

    for (let i = 0; i < count * 4; i++) {
      result += "_";
    }

    result += '"재귀함수가 뭔가요?"\n';

    for (let i = 0; i < count * 4; i++) {
      result += "_";
    }

    result +=
      '"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.\n';

    for (let i = 0; i < count * 4; i++) {
      result += "_";
    }

    result +=
      "마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.\n";

    for (let i = 0; i < count * 4; i++) {
      result += "_";
    }

    result +=
      '그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."\n';

    recursiveFunction(count + 1, number);

    for (let i = 0; i < count * 4; i++) {
      result += "_";
    }

    result += "라고 답변하였지.\n";
  };

  result += "어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.\n";
  recursiveFunction(0, N);

  return result;
};

console.log(solution());
