const fs = require("fs");

const input = fs.readFileSync("./input/input06.txt", "utf8").split("");

const findSequence = (input, pos = []) => {
  const temp = pos.map((p) => ({
    text: "",
    pos: p,
    result: "",
  }));

  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    temp.forEach((t) => {
      t.text += char;

      if (t.text.length > t.pos) {
        t.text = t.text.substring(1, t.pos + 1);
      }

      if (t.text.length === t.pos && t.result === "") {
        const set = [...new Set(t.text.split(""))];

        if (set.length === t.pos) {
          t.result = index + 1;
        }
      }
    });
  }

  return temp;
};

/*
 ************ Part 1 & 2 ************
 */

console.log("part 1:", findSequence(input, [4, 14]));
