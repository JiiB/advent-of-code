const fs = require("fs");

const [c, m] = fs.readFileSync("./input/input05.txt", "utf8").split("\n\n");

const construction = c
  .split("\n")
  .slice(0, -1)
  .map((line) => {
    return line
      .slice(0, -1)
      .split("")
      .filter((item, index) => index % 4 === 1);
  });

const moves = m.split("\n").map((move) => {
  const { amount, from, to } =
    /move (?<amount>\d*) from (?<from>\d*) to (?<to>\d*)/.exec(move).groups;

  return {
    amount: Number(amount),
    from: Number(from),
    to: Number(to),
    instruction: move, // for logs
  };
});

const repeat = (fn, repeatCount) => {
  for (let index = 0; index < repeatCount; index++) {
    fn();
  }
};

class Mover {
  data = [];

  constructor(construction) {
    this.data = new Array(construction[0].length).fill("").map((item) => []);

    for (let rowIndex = 0; rowIndex < construction.length; rowIndex++) {
      const row = construction[rowIndex];

      for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
        const cell = row[cellIndex];
        if (!!cell.trim()) {
          this.data[cellIndex].unshift(cell);
        }
      }
    }
  }

  move = (from, to, amount = 1) => {
    const temp = this.data[from - 1].splice(-amount);
    this.data[to - 1].push(...temp);
  };

  getResult = () => {
    return this.data.map((item) => item[item.length - 1]).join("");
  };
}

/*
 ************ Part 1 ************
 */

const crateMover9000 = new Mover(construction);

moves.forEach(({ amount, from, to, instruction }) => {
  console.log("ongoing: ", instruction);
  repeat(() => crateMover9000.move(from, to), amount);
});

console.log("part 1", crateMover9000.getResult());

/*
 ************ Part 2 ************
 */

const crateMover9001 = new Mover(construction);

moves.forEach(({ amount, from, to, instruction }) => {
  console.log("ongoing: ", instruction);
  crateMover9001.move(from, to, amount);
});

console.log("part 2", crateMover9001.getResult());
