const fs = require("fs");

const input = fs.readFileSync("./input/input03.txt", "utf8").split("\n");

/*
 ************ Common helpers ************
 */

const intersection = (a, b) => {
  const setA = new Set(a);
  return [...new Set(b)].filter((value) => setA.has(value));
};

const getPriority = (str) => {
  const strCharCode = str.charCodeAt();
  const isUppercase = strCharCode >= 65 && strCharCode <= 90;

  return isUppercase ? strCharCode - 38 : strCharCode - 96;
};

const getPrioritySum = (arr) => {
  return arr.reduce((acc, curr) => {
    const priority = getPriority(curr);
    return acc + priority;
  }, 0);
};

/*
 ************ Part 1 ************
 */

const res = input
  .map((list) => {
    const half = Math.ceil(list.length / 2);

    const firstHalf = list.slice(0, half).split("");
    const secondHalf = list.slice(half).split("");

    return intersection(firstHalf, secondHalf);
  })
  .flat();

const result1 = getPrioritySum(res);

console.log(`result part 1: ${result1}`);

/*
 ************ Part 2 ************
 */

const groups = input.reduce((acc, curr, index) => {
  const groupIndex = Math.floor(index / 3);

  if (!acc[groupIndex]) {
    acc[groupIndex] = [];
  }

  acc[groupIndex].push(curr);

  return acc;
}, []);

const findCommonLetter = (group) => {
  const first = group[0].split("");
  const second = group[1].split("");
  const third = group[2].split("");

  const firstSecond = intersection(first, second);
  const firstThird = intersection(first, third);
  const secondThird = intersection(second, third);

  const common = intersection(firstSecond, firstThird);

  return common[0];
};

const commonLetters = groups.map(findCommonLetter).flat();

const result2 = getPrioritySum(commonLetters);

console.log(`result part 2: ${result2}`);
