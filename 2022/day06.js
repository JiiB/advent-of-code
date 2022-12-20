const fs = require("fs");

const input = fs.readFileSync("./input/input06.txt", "utf8").split("");

const findSequence = (input, pos) => {
  let temp = "";
  let found = "";
  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    temp += char;

    if (temp.length > pos) {
      temp = temp.substring(1, pos + 1);
    }

    if (temp.length === pos && found === "") {
      const set = [...new Set(temp.split(""))];

      if (set.length === pos) {
        found = index + 1;
      }
    }
  }

  return found;
};

/*
 ************ Part 1 ************
 */

console.log("part 1:", findSequence(input, 4));

/*
 ************ Part 2 ************
 */

console.log("part 2:", findSequence(input, 14));
