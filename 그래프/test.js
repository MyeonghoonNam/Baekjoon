// const input = ['2'];
// const input = ['4'];
// const input = ['6'];
const input = ['18'];

console.log(Solution(input));

function Solution(input) {
  const MAX = 2000;
  const S = Number(input[0]);
  const visited = Array.from(new Array(MAX + 1), () =>
    new Array(MAX + 1).fill(false)
  );

  const q = [[1, 0, 0]];
  visited[1][0] = true;

  while (q.length > 0) {
    const [display, clip, time] = q.shift();

    if (display === S) return time;

    // 1번, 3번 조건
    if (display > 0 && display <= MAX) {
      if (!visited[display][display]) {
        visited[display][display] = true;
        q.push([display, display, time + 1]);
      }

      if (!visited[display - 1][clip]) {
        visited[display - 1][clip] = true;
        q.push([display - 1, clip, time + 1]);
      }
    }

    // 2번 조건
    if (clip > 0 && display + clip <= MAX) {
      if (!visited[display + clip][clip]) {
        visited[display + clip][clip] = true;
        q.push([display + clip, clip, time + 1]);
      }
    }
  }
}
