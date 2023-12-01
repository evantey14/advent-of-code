console.log(
  require("fs")
    .readFileSync("day01/input.txt")
    .toString()
    .split("\n")
    .filter(i => i.length > 0)
    .map(i => parseInt(i))
    .reduce((prev, current, index, array) => prev + (current > array[index - 3]), 0)
);
