// const input = ['4', '1 2 3 4'];
// const input = ['4', '1 2 4 3'];
// const input = ['5', '1 2 3 5 4'];
const input = ['5', '5 4 3 2 1'];

const N = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const visited = new Array(N + 1).fill(false);
visited[0] = true;

const result = [];

for (let i = N - 1; i > 0; i--) {
  if (arr[i - 1] < arr[i]) {
    // prev
    for (let j = 0; j < i - 1; j++) {
      result.push(arr[j]);
      visited[arr[j]] = true;
    }

    // next
    let startIdx = arr[i - 1] + 1;
    let next = visited.findIndex((v, i) => i >= startIdx && v === false);
    result.push(next);
    visited[next] = true;

    // 나머지
    visited.forEach((v, i) => {
      if (v === false) {
        result.push(i);
      }
    });

    break;
  }
}

if (result.length === 0) {
  console.log(-1);
} else {
  console.log(result.join(' '));
}
