const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
20 3
900
300
100
400
1300`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 최고의 피자 = 피자 중 1원당 열량이 가장 높은 피자
// 토핑 N개 중 여러 종류 선택 가능, 같은 종류 2개 이상 선택불가, 토핑 선택안하는거 가능
// 도우 A원, 토핑 B원 => A + B * K는 피자가격(K는 토핑 종류 수)
// 피자의 열량 = 도우, 토핑 열량의 합

// 최고의 피자의 1원당 열량 출력 소수점 이하는 버리고 정수 값 출력
const solution = () => {
  const N = Number(input());
  const [doughPrice, toppingPrice] = input().split(" ").map(Number);
  const doughCalorie = Number(input());
  const toppingCalorie = [];

  for (let i = 0; i < N; i++) {
    toppingCalorie.push(Number(input()));
  }

  toppingCalorie.sort((a, b) => b - a);

  let pizzaPrice = doughPrice;
  let pizzaCalorie = doughCalorie;
  let result = doughCalorie / doughPrice;
  let ratio = 0;

  for (let i = 0; i < N; i++) {
    pizzaPrice += toppingPrice;
    pizzaCalorie += toppingCalorie[i];
    ratio = pizzaCalorie / pizzaPrice;

    if (result < ratio) {
      result = ratio;
    }
  }

  return Math.floor(result);
};

console.log(solution());
