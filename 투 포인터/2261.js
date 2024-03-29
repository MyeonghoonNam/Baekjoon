const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

function initPoints() {
  const n = +input[0];
  const points = Array(n);

  for (let i = 0; i < n; i += 1) {
    points[i] = input[i + 1].split(" ").map((c) => +c);
  }

  return points.sort((a, b) => a[0] - b[0]);
}

function getDist(p1, p2) {
  return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;
}

function getMinDistWithLoop(points, start, end) {
  let dist = Infinity;

  for (let i = start; i < end; i += 1) {
    for (let j = i + 1; j <= end; j += 1) {
      const temp = getDist(points[i], points[j]);
      dist = Math.min(dist, temp);
    }
  }

  return dist;
}

function getMinDistWithRec(points, start, end) {
  if (end - start <= 2) return getMinDistWithLoop(points, start, end);

  const mid = Math.floor((start + end) / 2);
  const leftDist = getMinDistWithRec(points, start, mid - 1);
  const rightDist = getMinDistWithRec(points, mid + 1, end);

  let dist = Math.min(leftDist, rightDist);
  let candidate = [points[mid]];

  for (let i = mid - 1; i >= start; i -= 1) {
    const horizontal = (points[mid][0] - points[i][0]) ** 2;
    if (horizontal < dist) candidate.push(points[i]);
    else break;
  }

  for (let i = mid + 1; i <= end; i += 1) {
    const horizontal = (points[i][0] - points[mid][0]) ** 2;
    if (horizontal < dist) candidate.push(points[i]);
    else break;
  }

  candidate.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < candidate.length - 1; i += 1) {
    for (let j = i + 1; j < candidate.length; j += 1) {
      const vertical = (candidate[j][1] - candidate[i][1]) ** 2;
      if (vertical >= dist) break;

      const temp = getDist(candidate[i], candidate[j]);
      dist = Math.min(dist, temp);
    }
  }

  return dist;
}

function solution() {
  const points = initPoints();
  return getMinDistWithRec(points, 0, points.length - 1);
}

console.log(solution());
