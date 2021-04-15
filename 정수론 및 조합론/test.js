const input = [[4], [12, 3, 8, 4]];

const N = input[0][0];
const rings = input[1];

const firstRing = rings[0];
let result = '';

for (let i = 1; i < N; i++) {
  const otherRing = rings[i];
  const gcdValue = GCD(firstRing, otherRing);

  result += `${firstRing / gcdValue}/${otherRing / gcdValue}\n`;
}

console.log(result);

function GCD(a, b) {
  if (b === 0) {
    return a;
  } else {
    return GCD(b, a % b);
  }
}
