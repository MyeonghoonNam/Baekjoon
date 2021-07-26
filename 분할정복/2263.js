'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
1 2 3
1 3 2`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  let result = '';

  const inOrder = input().split(' ').map(Number);
  const postOrder = input().split(' ').map(Number);

  const callStack = [[0, N - 1, 0, N - 1]];

  while (callStack.length) {
    const [inBegin, inEnd, postBegin, postEnd] = callStack.pop();

    // 모순의 경우
    if (inBegin > inEnd || postBegin > postEnd) continue;

    const root = postOrder[postEnd];

    result += root + ' ';

    let inRootIdx;

    for (let i = inBegin; i <= inEnd; i++) {
      if (inOrder[i] === root) {
        inRootIdx = i;
        break;
      }
    }

    const postLeftEnd = postBegin + (inRootIdx - 1 - inBegin);

    callStack.push([inRootIdx + 1, inEnd, postLeftEnd + 1, postEnd - 1]);
    callStack.push([inBegin, inRootIdx - 1, postBegin, postLeftEnd]);
    //후위순회의 마지막이 루트이기 때문에 preorder 함수에서 세번째 네번째 매개변수로 후위순회의 시작과 끝을 받고,
    // 전위순회를 출력할 때 왼쪽 서브트리의 루트들부터 출력해야하기 때문에 첫번째 두번째 매개변수로 중위순회의 시작과 끝을 받습니다. (중위순회의 경우 루트 기준 왼쪽이 왼쪽 서브트리)
    // idx[root]는 중위순회에서의 루트 위치이고 후위순회에서 왼쪽 서브트리의 끝을 알기 위해 postBegin + (idx[root] - inBegin) - 1 을 네번째 매개변수로 전달해주는 것입니다.
    // 여기서 idx[root] - inBegin은 왼쪽 서브트리의 크기입니다.
  }

  return result;
}
