const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  // 입력 관리
  const input = line.split(' ').map((el) => BigInt(el));

  // 구현
  const A = input[0];
  const B = input[1];
  const C = input[2];

  // 일반적인 반복의 거듭제곱의 경우 시간복잡도 = O(n)
  // 분할 정복을 이용한 거듭제곱 공식, 시간복잡도 = O(log2(n))

  // C^N
  // (1) N = 짝수, C^N/2 * C^N/2
  // (2) N = 홀수, C^(N-1)/2 * C^(N-1)/2 * C

  // MOD 연산
  // (A * B) % C = ((A % C) * (B % C)) % C

  console.log(Solution(A, B).toString());

  function Solution(A, B) {
    if (B === BigInt(1)) {
      return A % C;
    }

    const temp = Solution(A, B / BigInt(2));

    // 홀수
    if (B % BigInt(2) === BigInt(1)) {
      return (((temp * temp) % C) * (A % C)) % C;
    }
    // 짝수
    return (temp * temp) % C;
  }
}).on('close', () => {
  process.exit();
});
