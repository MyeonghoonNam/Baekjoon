// 메모리초과발생, 백준의 nodejs로의 정답자가 존재 하지 않는다.

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `26
add 1
add 2
check 1
check 2
check 3
remove 2
check 1
check 2
toggle 3
check 1
check 2
check 3
check 4
all
check 10
check 20
toggle 10
remove 20
check 10
check 20
empty
check 1
toggle 1
check 1
toggle 1
check 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const M = Number(input());
  let BIT = 0;

  for (let i = 0; i < M; i++) {
    const [cmd, x] = input().split(' ');

    switch (cmd) {
      case 'add':
        BIT |= 1 << x;
        break;
      case 'remove':
        BIT &= ~(1 << x);
        break;
      case 'check':
        if (BIT & (1 << x)) console.log(1);
        else console.log(0);
        break;
      case 'toggle':
        BIT ^= 1 << x;
        break;
      case 'all':
        BIT = (1 << 21) - 1;
        break;
      case 'empty':
        BIT = 0;
        break;
    }
  }
}
