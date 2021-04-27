const input = ['5 17'];

Solution(input);

function Solution(input) {
  const [N, K] = input[0].split(' ').map((el) => parseInt(el));
  const visited = new Array(100001).fill(false);

  const queue = [];
  queue.push([N, 0]);

  while (queue.length > 0) {
    const [pos, count] = queue.shift();

    if (visited[pos]) continue;

    visited[pos] = true;

    if (pos === K) {
      console.log(count);
      return;
    }

    if (pos * 2 <= 100000) {
      queue.push([pos * 2, count + 1]);
    }

    if (pos + 1 <= 100000) {
      queue.push([pos + 1, count + 1]);
    }

    if (pos - 1 <= 100000) {
      queue.push([pos - 1, count + 1]);
    }
  }
}
