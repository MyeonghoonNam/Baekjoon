const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 30
7 13 5
14 4 4
15 3 10
25 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 빨간 불 지속시간, 초록 불 지속시간
 * 시작: 모든 신호등이 빨간불로 시작, 사이클의 시작 상태
 * 1초에 1미터 움직인다.
 * 빨간불일 때 그 자리 스탑 후 초록불 될 때 까지 기다린다.
 *
 * 요구사항: 상근이가 도로의 시작 부터 도로의 끝까지 이동하는데 걸리는 시간 도출
 * 도로의 시작: 0미터, 도로의 끝: l미터
 *
 * 1. 매 초마다 신호등 갱신
 * 2. 신호등 상태에 따라 상근이의 위치 갱신
 */
const solution = () => {
  const [N, L] = input().split(" ").map(Number);
  const traffic_light = [];

  for (let i = 0; i < N; i++) {
    const [position, max_red, max_green] = input().split(" ").map(Number);
    const data = {
      position,
      max_red,
      max_green,
      current_red: max_red,
      current_green: max_green,
    };

    traffic_light.push(data);
  }

  let current_position = 0;
  let time = 0;
  while (current_position !== L) {
    const trafficLight_position = traffic_light[0]?.position;

    if (current_position < trafficLight_position || !trafficLight_position) {
      current_position += 1;
    } else {
      const flag = traffic_light[0].current_red > 0 ? false : true; // 이동가능여부

      if (flag) {
        current_position += 1;
        traffic_light.shift(); // 지나친 신호등을 제거하며 가장 가까운 신호등 갱신
      }
    }

    // 신호 갱신
    for (let i = 0; i < traffic_light.length; i++) {
      const flag = traffic_light[i].current_red > 0 ? true : false;

      if (flag) {
        // 빨간불
        traffic_light[i].current_red -= 1;
      } else {
        // 초록불
        traffic_light[i].current_green -= 1;

        if (traffic_light[i].current_green === 0) {
          traffic_light[i].current_red = traffic_light[i].max_red;
          traffic_light[i].current_green = traffic_light[i].max_green;
        }
      }
    }

    time += 1;
  }

  return time;
};

console.log(solution());
