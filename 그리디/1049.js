const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9 16
21 25
77 23
23 88
95 43
96 19
59 36
80 13
51 24
15 8
25 61
21 22
3 9
68 68
67 100
83 98
96 57`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  let [N, M] = input().split(" ").map(Number);
  const PACKAGE_COMPOSITION_COUNT = 6;
  const packagePriceList = [];
  const singlePriceList = [];

  for (let i = 0; i < M; i++) {
    const [packagePrice, singlePrice] = input().split(" ").map(Number);

    packagePriceList.push(packagePrice);
    singlePriceList.push(singlePrice);
  }

  packagePriceList.sort((a, b) => a - b);
  singlePriceList.sort((a, b) => a - b);

  const minPackagePrice = packagePriceList[0];
  const minSinglePrice = singlePriceList[0];

  let onlyPackagePrice = 0;
  let notOnlyPackagePrice = 0;

  onlyPackagePrice +=
    Math.ceil(N / PACKAGE_COMPOSITION_COUNT) * minPackagePrice;

  if (minPackagePrice <= minSinglePrice * PACKAGE_COMPOSITION_COUNT) {
    const quantity = parseInt(N / PACKAGE_COMPOSITION_COUNT);
    notOnlyPackagePrice += quantity * minPackagePrice;
    N -= quantity * PACKAGE_COMPOSITION_COUNT;
  }

  notOnlyPackagePrice += N * minSinglePrice;

  const result = Math.min(onlyPackagePrice, notOnlyPackagePrice);

  return result;
};

console.log(solution());
