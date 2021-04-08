// 이진 탐색은 매우 빠른 속도로 데이터를 찾을 수 있지만 반드시 데이터가 정렬되어있어야만 한다.
function binarySearch (target, dataArray) {
  let low = 0;
  let high = dataArray.length - 1;
  
  while (low <= high) {
    let mid = Math.floor((high + low) / 2);
    let guess = dataArray[mid];
    if (guess === target) {
      return guess;
    } else if (guess > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  
  return undefined;
}
