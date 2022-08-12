const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `06:00 12:00 18:00
06:00 shinyo17
06:00 kimchist
06:00 swoon
06:00 kheee512
06:00 Green55
09:00 kimchist
11:59 shinyo17
12:00 kimchist
17:59 swoon
17:59 swoon
18:00 kheee512
18:01 swoon
18:01 Green55
18:01 kheee512
18:01 swoon
18:21 jinius36
18:40 jeongyun1206`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 개강총회 시작 전
 * 학회원 입장 여부 확인
 * 개총 시작 이전에 대화를 한 적 있는 학회원의 닉네임을 보고 체크
 * 개총을 시작하자마자 채팅 기록을 남긴 학회원도 제 시간에 입장으로 간주
 *
 * 개총 끝난 후 스트리밍을 끝낼 때 까지
 * 학회원 퇴장 여부 확인
 * 개총 끝나고 스트리밍이 끝날 때까지 대화를 한 적이 있는 학회원의 닉네임을 보고 체크
 * 개총이 끝나자마자 채팅 기록을 남겼거나, 개총 스트리밍이 끝나자마자 채팅 기록을 남긴 학회원의 닉네임도 제 시간에 퇴장으로 간주
 *
 * 00:00부터 개총 시작 전까지는 대기 시간, 개총 스트리밍이 끝난 시간 이후 남긴 채팅 기록은 다른 스트리밍 영상의 채팅 기록으로 간주.
 *
 * 도출: 입장부터 퇴장까지 모두 확인된 학회원은 전부 몇 명인가?
 */
const solution = () => {
  const [S, E, Q] = input().replaceAll(":", "").split(" ").map(Number);
  const record = new Set();
  let result = 0;

  while (true) {
    const log = input();
    if (!log) break;

    let [time, name] = log.replace(":", "").split(" ");
    time = Number(time);

    if (time <= S) {
      record.add(name);
    } else if (E <= time && time <= Q) {
      if (record.has(name)) {
        record.delete(name);
        result++;
      }
    }
  }

  return result;
};

console.log(solution());
