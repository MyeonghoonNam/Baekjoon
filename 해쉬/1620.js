const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `26 5
Bulbasaur
Ivysaur
Venusaur
Charmander
Charmeleon
Charizard
Squirtle
Wartortle
Blastoise
Caterpie
Metapod
Butterfree
Weedle
Kakuna
Beedrill
Pidgey
Pidgeotto
Pidgeot
Rattata
Raticate
Spearow
Fearow
Ekans
Arbok
Pikachu
Raichu
25
Raichu
3
Pidgey
Kakuna`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const map_number = new Map();
  const map_string = new Map();
  const question = [];

  for (let i = 1; i <= N; i++) {
    const number = i;
    const string = input();

    map_number.set(number, string);
    map_string.set(string, number);
  }

  for (let i = 0; i < M; i++) {
    const data = input();

    if (Number.isInteger(Number(data))) {
      question.push(Number(data));
    } else {
      question.push(data);
    }
  }

  const result = [];
  question.forEach((q) => {
    if (Number.isInteger(q)) {
      result.push(map_number.get(q));
    } else {
      result.push(map_string.get(q));
    }
  });

  return result.join("\n");
};

console.log(solution());
