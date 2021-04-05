const table = new Array(3);
for (let i = 0; i < 3; ++i) {
  table[i] = new Array(3);
  for (let j = 0; j < 3; ++j) {
    table[i][j] = new Array(3).fill(0);
  }
}

console.log(table);