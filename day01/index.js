const fs = require("fs");

const input = fs
  .readFileSync("day01/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const depths = input.map(i => parseInt(i));

let count = 0;
for (let i = 3; i < depths.length; i++) {
  if (depths[i] > depths[i-3]) {
    count++;
  }
}

console.log(count);
