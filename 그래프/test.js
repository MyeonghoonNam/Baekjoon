const input = ['5 17'];

function Solution(input) {
  const MAX = 100000;
  const [N, K] = input[0].split(' ').map(Number);
  const visited = new Array(MAX + 1).fill(false)
  ;
  let route = '';

  const q = [N];
  while(q.length > 0) {
    const [pos, time] = q.shift();

    visited[pos] = true;

    if(pos === K)
  }
}
