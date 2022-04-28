const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
5 1 7 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 요구사항: 한 개의 안테나를 설치하고 안테나로부터 모든 집까지의 거리의 총 합이 최소가 되는 안테나의 위치 구하기
 *
 * 안테나는 집이 위치한 곳에만 설치 가능
 * 설치 위치가 여러 개가 도출되는 경우 가장 작은 위치 값을 출력한다.
 *
 * 1. 주어진 집의 위치를 오름차순으로 정렬
 * 2. 정렬된 집의 위치들에서 중앙에 위치한 집에 안테나를 설치하는 것이 가장 작은값으로 도출 가능
 * 3. 거리의 총 합이 여러개인 경우 집의 위치가 짝수개일 때 정확한 중앙의 인덱스를 못구할때도 가장 작은 위치의 인덱스를 출력하므로 문제없이 해결 가능
 */

const solution = () => {
  const N = Number(input());
  const home = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  const mid_index = parseInt((home.length - 1) / 2);
  const result = home[mid_index];

  return result;
};

console.log(solution());
