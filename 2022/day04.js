const fs = require("fs");

const input = fs
  .readFileSync("./input/input04.txt", "utf8")
  .split("\n")
  .map((line) => {
    const [elv1, elv2] = line.split(",");
    const [min1, max1] = elv1.split("-").map(Number);
    const [min2, max2] = elv2.split("-").map(Number);

    return { min1, max1, min2, max2 };
  });

/*
 ************ Part 1 ************
 */

const part1 = input.filter(({ min1, max1, min2, max2 }) => {
  // check if the ranges fully overlap
  return (min2 >= min1 && max2 <= max1) || (min1 >= min2 && max1 <= max2);
});

console.log(part1.length);

/*
 ************ Part 2 ************
 */

const part2 = input.filter(({ min1, max1, min2, max2 }) => {
  // check if the ranges partially overlap
  return (min2 >= min1 && min2 <= max1) || (min1 >= min2 && min1 <= max2);
});

console.log(part2.length);
