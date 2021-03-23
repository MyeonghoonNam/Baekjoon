let prediction = [
  {className: "dog", probability: 0.0994933694601059},
  {className: "cat", probability: 0.7909739017486572},
  {className: "bear", probability: 0.00002487616984581109},
  {className: "dinosaur", probability: 0.009141429327428341},
  {className: "rabbit", probability: 0.1003664880990982}
];
console.log(prediction);
// // className(key)의 값(value)을 알파벳 순서대로 정렬
prediction.sort((a, b) => {
  let nameA = a.className.toUpperCase();
  let nameB = b.className.toUpperCase();
  
  if (nameA < nameB) {
    return 1;
  }
  else if (nameA > nameB) {
    return -1;
  }
  else {
    return 0;
  }
});
console.log(prediction);
