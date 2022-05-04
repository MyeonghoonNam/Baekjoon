const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `C1 B1 3
L
T
LB`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 위치명령: 알파벳 + 숫자 => 알파벳은 열, 숫자는 행
 * 열의 가장 왼쪽은 A부터 가장 오른쪽은 H
 * 행은 가장 아래가 1부터 가장 위는 8
 * ex) 맨 왼쪽 맨 아래 = A1, 그 오른쪽은 B1
 * 
 * 체스판에 돌이 1개 존재, 킹이 돌의 위치에 이동할 때 돌을 킹의 이동방향으로 한 칸 이동시키고 킹이 기존 돌의 위치에 이동한다.
 * 킹이나 돌이 체스판 밖으로 떨어지는 명령은 무시한다.
 
 * 요구사항 : 입력으로 킹의 움직임이 주어질 때 킹과 돌의 마지막 위치를 도출
 */

const solution = () => {
  const getNumberPosition = (str) => {
    let temp = {};

    const char_alphabet = str[0];
    const char_number = str[1];

    const x = char_alphabet.charCodeAt(0) - "A".charCodeAt(0);
    const y = char_number.charCodeAt(0) - "1".charCodeAt(0);

    temp.x = Number(x);
    temp.y = Number(y);

    return temp;
  };

  const getAlphabetPosition = (coordinate) => {
    let x = coordinate.x.toString();
    let y = coordinate.y;

    x = String.fromCharCode(x.charCodeAt(0) + 17);
    y += 1;

    const result = `${x}${y}`;
    return result;
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < 8 && y < 8) return true;
    else return false;
  };

  const move = {
    R: { x: 1, y: 0 },
    L: { x: -1, y: 0 },
    B: { x: 0, y: -1 },
    T: { x: 0, y: 1 },
    RT: { x: 1, y: 1 },
    LT: { x: -1, y: 1 },
    RB: { x: 1, y: -1 },
    LB: { x: -1, y: -1 },
  };

  let [king_position, rock_position, N] = input().split(" ");

  king_position = getNumberPosition(king_position);
  rock_position = getNumberPosition(rock_position);
  N = Number(N);

  while (N--) {
    const { x: kx, y: ky } = king_position;
    const { x: rx, y: ry } = rock_position;
    const { x: dx, y: dy } = move[input()];

    const nkx = kx + dx;
    const nky = ky + dy;

    if (!checkMapRange(nkx, nky)) continue;

    if (nkx === rx && nky === ry) {
      const nrx = rx + dx;
      const nry = ry + dy;

      if (checkMapRange(nrx, nry)) {
        king_position.x = nkx;
        king_position.y = nky;
        rock_position.x = nrx;
        rock_position.y = nry;
      }
    } else {
      king_position.x = nkx;
      king_position.y = nky;
    }
  }

  king_position = getAlphabetPosition(king_position);
  rock_position = getAlphabetPosition(rock_position);

  return `${king_position}\n${rock_position}`;
};

console.log(solution());
