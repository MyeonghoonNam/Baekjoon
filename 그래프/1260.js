const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  // 구현
  const [N, M, V] = input[0];
  input.shift();

  let graph = Array.from(new Array(N + 1), () => new Array());
  let visited = new Array(N + 1).fill(false);

  for (let i = 0; i < M; i++) {
    const [v1, v2] = input[i];

    insertEdge(v1, v2);
    insertEdge(v2, v1);
  }

  let result = [];

  dfs(V);
  console.log(result.join(' '));

  // bfs를 위하여 방문기록과 결과 초기화
  visited.fill(false);
  result = [];

  bfs(V);
  console.log(result.join(' '));

  function insertEdge(vFront, vBack) {
    let index = 0;
    for (let i = 0; i < graph[vFront].length; i++) {
      //인접한 정점 배열에서 vBack보다 크거나 같은 정점 찾을 때까지 continue
      if (graph[vFront][i] < vBack) {
        index = i + 1;
        continue;
      }

      //문제에서 두 정점 사이에 여러 개의 간선이 있을 수 있다고 했으므로
      //인접한 정점 배열에 이미 vBack 정점이 있다면 삽입 인덱스에 null 저장, 이러면 삽입 무시하므로 => 결과적으로 오름차순 유지
      if (graph[vFront][i] === vBack) {
        index = null;
      }

      break;
    }

    //삽입 인덱스가 null이 아니라면 vBack을 인덱스에 삽입 => 오름차순 정렬효과
    if (index !== null) {
      graph[vFront].splice(index, 0, vBack);
    }
  }

  function dfs(v) {
    if (visited[v]) return;

    visited[v] = true;

    result.push(v);

    graph[v].forEach((vertex) => {
      if (!visited[vertex]) {
        dfs(vertex);
      }
    });
  }

  function bfs(vStart) {
    //방문할 정점을 담는 배열
    const willVisit = [vStart];

    let v = 0;
    //방문할 정점이 안 남을 때까지
    while (willVisit.length !== 0) {
      //방문할 정점 배열의 첫 번째 원소 삭제 후 저장
      v = willVisit.shift();

      //이미 방문했으면 continue
      if (visited[v]) {
        continue;
      }

      //방문 사실 저장
      visited[v] = true;

      //결과 변수에 정점 삽입
      result.push(v);

      //인접한 정점 배열을 차례로 돌며 방문하지 않은 정점을
      //방문할 정점 배열의 끝에 삽입

      graph[v].forEach((vertex) => {
        if (!visited[vertex]) {
          willVisit.push(vertex);
        }
      });
    }
  }
});
