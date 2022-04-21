const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 4 4
0 1
2 2
5 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const calculateDistance = (apartment, total_seat, school_position) => {
    let now_position = school_position;
    let now_seat = 0;
    let total_distance = 0;

    while (apartment.length > 0) {
      const current_apartment = apartment[apartment.length - 1];
      const { apartment_position, student_count } = current_apartment;

      if (now_seat + student_count <= total_seat) {
        apartment.pop();
        now_seat += student_count;
      } else {
        current_apartment.student_count -= total_seat - now_seat;
        now_seat += total_seat - now_seat;
      }

      total_distance += Math.abs(now_position - apartment_position);
      now_position = apartment_position;

      if (now_seat === total_seat || apartment.length === 0) {
        total_distance += Math.abs(now_position - school_position);
        now_position = school_position;
        now_seat = 0;
      }
    }

    return total_distance;
  };

  // 아파트단지 수, 버스 정원, 학교위치
  const [N, K, S] = input().split(" ").map(Number);
  const left_apartment = []; // 학교 기준 왼족 아파트
  const right_apartment = []; // 학교 기준 오른쪽 아파트

  for (let i = 0; i < N; i++) {
    const [apartment_position, student_count] = input().split(" ").map(Number);

    if (apartment_position < S) {
      left_apartment.push({ apartment_position, student_count });
    } else if (apartment_position > S) {
      right_apartment.push({ apartment_position, student_count });
    }
  }

  left_apartment.sort((a, b) => b.apartment_position - a.apartment_position);
  right_apartment.sort((a, b) => a.apartment_position - b.apartment_position);

  const result =
    calculateDistance(left_apartment, K, S) +
    calculateDistance(right_apartment, K, S);

  return result;
};

console.log(solution());
