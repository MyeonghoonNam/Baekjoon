const numberInput = [2, 3, 3];
const stringInput = [
  ['hat', 'headgear'],
  ['sunglasses', 'eyewear'],
  ['turban', 'headgear'],
  ['mask', 'face'],
  ['sunglasses', 'face'],
  ['makeup', 'face'],
];

const T = numberInput[0];
numberInput.shift();

let firstIdx = 0; // 테스트 케이스 위치 기록
numberInput.forEach((el) => {
  const map = {};

  for (let i = firstIdx; i < firstIdx + el; i++) {
    const key = stringInput[i][1];
    const value = stringInput[i][0];

    if (map[key]) {
      map[key].push(value);
    } else {
      map[key] = [value];
    }
  }

  firstIdx += el;

  console.log(map);
});
