class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  NUM(value) {
    const newNode = new Node(value);

    newNode.next = this.top;
    this.top = newNode;

    this.size++;

    return 0;
  }

  POP() {
    if (this.top === null) {
      return 1;
    }

    const popNode = this.top;

    if (this.size === 1) {
      this.top === null;
    } else {
      this.top = popNode.next;
    }

    this.size--;

    return [0, popNode];
  }

  INV() {
    if (this.top === null) return 1;

    this.top.value = -this.top.value;
    return 0;
  }

  DUP() {
    if (!this.top) return 1;

    this.NUM(this.top.value);

    return 0;
  }

  SWP() {
    if (this.getValue() === 1) return 1;

    const [firstNumber, secondNumber] = this.getValue();

    this.NUM(firstNumber);
    this.NUM(secondNumber);

    return 0;
  }

  ADD() {
    if (this.getValue() === 1) return 1;

    const [firstNumber, secondNumber] = this.getValue();

    this.NUM(firstNumber + secondNumber);

    return 0;
  }

  SUB() {
    if (this.getValue() === 1) return 1;

    const [firstNumber, secondNumber] = this.getValue();

    this.NUM(secondNumber - firstNumber);
  }

  MUL() {
    if (this.getValue() === 1) return 1;

    const [firstNumber, secondNumber] = this.getValue();

    this.NUM(firstNumber * secondNumber);

    return 0;
  }

  // DIV() {
  //   if(this.getValue() === 1) return 1;

  //   const [firstNumber, secondNumber] = this.getValue();

  // }

  // MOD() {
  //   if(this.getValue() === 1) return 1;

  //   const [firstNumber, secondNumber] = this.getValue();
  // }

  getValue() {
    const firstNode = this.POP[1];
    const secondNode = this.POP[1];

    if (!firstNode || !secondNode) {
      return 1;
    }

    const firstNumber = firstNode.value;
    const secondNumber = secondNode.value;

    return [firstNumber, secondNumber];
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `DUP
MUL
NUM 2
ADD
END
3
1
10
50

NUM 1
NUM 1
ADD
END
2
42
43

NUM 600000000
ADD
END
3
0
600000000
1

QUIT`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const INPUTS = [];
const MAX = 1000000000;

const initInput = () => {
  let temp = [];

  while (true) {
    const line = input();

    if (line === "QUIT") {
      break;
    } else if (line === "") {
      INPUTS.push(temp);
      temp = [];
    } else {
      temp.push(line);
    }
  }
};

const splitProgramInput = (program) => {
  const mods = [];
  const numbers = [];
  let N = null;

  program.forEach((el) => {
    if (Number(el) && N == null) {
      N = Number(el);
    } else if (Number(el) || Number(el) === 0) {
      numbers.push(Number(el));
    } else {
      mods.push(el);
    }
  });

  return [mods, numbers, N];
};

const executeProgram = (mods, numbers, n) => {
  for (let i = 0; i < n; i++) {
    const stack = new Stack();
    const initStackNumber = numbers[i];
    let ERR_CHECK = 0;

    stack.NUM(initStackNumber);

    mods.forEach((el) => {
      const [mod, num] = el.split(" ");
      switch (mod) {
        case "NUM":
          ERR_CHECK = stack.NUM(Number(num));
          break;
        case "POP":
          break;
        case "INV":
          break;
        case "DUP":
          ERR_CHECK = stack.DUP();
          break;
        case "SWP":
          break;
        case "ADD":
          ERR_CHECK = stack.ADD();
          break;
        case "SUB":
          break;
        case "MUL":
          ERR_CHECK = stack.MUL();
          break;
        case "DIV":
          break;
        case "MOD":
          break;
        case "END":
          if (
            stack.size !== 1 ||
            stack.top.value > MAX ||
            stack.top.value < -MAX
          ) {
            ERR_CHECK = 1;
          }

          if (ERR_CHECK === 1) {
            console.log("ERROR");
          } else {
            console.log(stack.top.value);
          }

          break;
        default:
          break;
      }
    });
  }

  console.log("");
};

const solution = () => {
  initInput();

  for (let i = 0; i < INPUTS.length; i++) {
    const program = INPUTS[i];
    const [mods, numbers, n] = splitProgramInput(program);

    executeProgram(mods, numbers, n);
  }
};

solution();
