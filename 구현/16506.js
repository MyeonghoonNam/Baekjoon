const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8
LSFTL 4 2 4
MULTC 3 7 12
NOT 2 0 4
SUB 4 4 3
ASFTR 6 4 1
MULT 7 7 5
RLC 6 4 14
RR 1 5 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const OP = {
    ADD: "0000",
    SUB: "0001",
    MOV: "0010",
    AND: "0011",
    OR: "0100",
    NOT: "0101",
    MULT: "0110",
    LSFTL: "0111",
    LSFTR: "1000",
    ASFTR: "1001",
    RL: "1010",
    RR: "1011",
  };

  const N = Number(input());
  const result = [];

  for (let i = 0; i < N; i++) {
    const command = input().split(" ");
    const opcode_human = command[0];
    const reg_human = command.slice(1).map(Number); // rD rA rB || rD rA #C
    const c_flag = opcode_human[opcode_human.length - 1] === "C" ? true : false;
    const opcode_machine =
      OP[
        c_flag ? opcode_human.slice(0, opcode_human.length - 1) : opcode_human
      ];
    const bit_4 = c_flag ? "1" : "0";
    const bit_5 = "0";
    const rD_machine = ("00" + reg_human[0].toString(2)).slice(-3);
    const rA_machine = ("00" + reg_human[1].toString(2)).slice(-3);
    const bit_rest =
      bit_4 === "0"
        ? ("00" + reg_human[2].toString(2)).slice(-3) + "0"
        : ("000" + reg_human[2].toString(2)).slice(-4);

    result.push(
      opcode_machine + bit_4 + bit_5 + rD_machine + rA_machine + bit_rest
    );
  }

  return result.join("\n");
};

console.log(solution());
