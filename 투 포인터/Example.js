function solution(n, arr) {
	let result = 0; // 부분 수열의 요소의 전체 합이 n인 부분 수열의 개수
  let sum = 0; // 부분 수열의 요소 전체 합
  let end = 0; // 투 포인터에서 끝 점에 해당된다.

  // 시작점 start를 배열 시작부터 오른쪽으로 한 칸씩 옮긴다.
  for(let start = 0; start < arr.length; start++) {
    // 끝점 end를 가능한 만큼 이동
    while(sum < n && end < arr.length) {
      sum += arr[end];

      end++;
    }

    if(sum === n) {
      result++;
    }

    sum -= arr[start];
  }

  return result;
}

const arr = [1, 2, 3, 2, 5];
console.log(solution(5, arr))