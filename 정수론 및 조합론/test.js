const clothes = [
  ['yellowhat', 'headgear'],
  ['bluesunglasses', 'eyewear'],
  ['green_turban', 'headgear'],
];

solution(clothes);

function solution(clothes) {
  const obj = {};
  for (let i = 0; i < clothes.length; i++) {
    const type = clothes[i][1];
    if (obj[type]) {
      obj[type]++;
    } else {
      obj[type] = 1;
    }
  }

  const count = Object.values(obj)
    .map((el) => {
      return el + 1;
    })
    .reduce((acc, cur) => {
      return acc * cur;
    });

  return count - 1;
}
