'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
2 2 2
4 4 4
8 8 8`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const selectedDir = new Array(5);
  let result = 0;

  const map = [];
  for (let i = 0; i < N; i++) {
    map[i] = input().split(' ').map(Number);
  }

  const cmap = Array.from(new Array(N), () => new Array(N));
  const copyMap = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        cmap[i][j] = map[i][j];
      }
    }
  };

  const findMax = () => {
    let max = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (cmap[i][j] > max) {
          max = cmap[i][j];
        }
      }
    }

    return max;
  };

  const moveRight = () => {
    for (let i = 0; i < N; i++) {
      for (let j = N - 1; j > 0; j--) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = j - 1;

          while (k >= 0) {
            if (cmap[i][k] !== 0) {
              flag = true;
              break;
            }

            k--;
          }

          if (flag) {
            cmap[i][j] = cmap[i][k];
            cmap[i][k] = 0;
          }
        }
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = N - 1; j > 0; j--) {
        if (cmap[i][j] === cmap[i][j - 1]) {
          cmap[i][j] = cmap[i][j] * 2;
          cmap[i][j - 1] = 0;
        }
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = N - 1; j > 0; j--) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = j - 1;

          while (k >= 0) {
            if (cmap[i][k] !== 0) {
              flag = true;
              break;
            }

            k--;
          }

          if (flag) {
            cmap[i][j] = cmap[i][k];
            cmap[i][k] = 0;
          }
        }
      }
    }
  };

  const moveLeft = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = j + 1;

          while (k <= N - 1) {
            if (cmap[i][k] !== 0) {
              flag = true;
              break;
            }

            k++;
          }

          if (flag) {
            cmap[i][j] = cmap[i][k];
            cmap[i][k] = 0;
          }
        }
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        if (cmap[i][j] === cmap[i][j + 1]) {
          cmap[i][j] = cmap[i][j] * 2;
          cmap[i][j + 1] = 0;
        }
      }
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N - 1; j++) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = j + 1;

          while (k <= N - 1) {
            if (cmap[i][k] !== 0) {
              flag = true;
              break;
            }

            k++;
          }

          if (flag) {
            cmap[i][j] = cmap[i][k];
            cmap[i][k] = 0;
          }
        }
      }
    }
  };

  const moveDown = () => {
    for (let i = N - 1; i > 0; i--) {
      for (let j = 0; j < N; j++) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = i - 1;

          while (k >= 0) {
            if (cmap[k][j] !== 0) {
              flag = true;
              break;
            }

            k--;
          }

          if (flag) {
            cmap[i][j] = cmap[k][j];
            cmap[k][j] = 0;
          }
        }
      }
    }

    for (let i = N - 1; i > 0; i--) {
      for (let j = 0; j < N; j++) {
        if (cmap[i][j] === cmap[i - 1][j]) {
          cmap[i][j] = cmap[i][j] * 2;
          cmap[i - 1][j] = 0;
        }
      }
    }

    for (let i = N - 1; i > 0; i--) {
      for (let j = 0; j < N; j++) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = i - 1;

          while (k >= 0) {
            if (cmap[k][j] !== 0) {
              flag = true;
              break;
            }

            k--;
          }

          if (flag) {
            cmap[i][j] = cmap[k][j];
            cmap[k][j] = 0;
          }
        }
      }
    }
  };

  const moveUp = () => {
    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N; j++) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = i + 1;

          while (k <= N - 1) {
            if (cmap[k][j] !== 0) {
              flag = true;
              break;
            }

            k++;
          }

          if (flag) {
            cmap[i][j] = cmap[k][j];
            cmap[k][j] = 0;
          }
        }
      }
    }

    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N; j++) {
        if (cmap[i][j] === cmap[i + 1][j]) {
          cmap[i][j] = cmap[i][j] * 2;
          cmap[i + 1][j] = 0;
        }
      }
    }

    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N; j++) {
        let flag = false;

        if (cmap[i][j] === 0) {
          let k = i + 1;

          while (k <= N - 1) {
            if (cmap[k][j] !== 0) {
              flag = true;
              break;
            }

            k++;
          }

          if (flag) {
            cmap[i][j] = cmap[k][j];
            cmap[k][j] = 0;
          }
        }
      }
    }
  };

  const playGame = () => {
    for (let i = 0; i < 5; i++) {
      const dir = selectedDir[i];

      if (dir === 0) moveRight();
      else if (dir === 1) moveLeft();
      else if (dir === 2) moveDown();
      else if (dir === 3) moveUp();
    }

    result = Math.max(result, findMax());
  };

  const dfs = (cnt) => {
    if (cnt === 5) {
      copyMap();
      playGame();
      return;
    }

    for (let i = 0; i < 4; i++) {
      selectedDir[cnt] = i;
      dfs(cnt + 1);
    }
  };

  dfs(0, 0);

  return result;
}
