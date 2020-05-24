const fs = require("fs");

const input = fs
  .readFileSync("day04/input.txt")
  .toString()
  .split("\n")
  .filter((i) => i.length > 0);

const [start, stop] = input[0].split("-").map((s) => parseInt(s));
console.log(start, stop);

const hasEqualAdjacentDigits = function (i) {
  const str = i.toString();
  let switches = [0];
  for (let j = 1; j < str.length; j++) {
    if (str.charAt(j - 1) !== str.charAt(j)) {
      switches.push(j);
    }
  }
  switches.push(6); // count the end as a switch

  for (let j = 1; j < switches.length; j++) {
    if (switches[j] - switches[j - 1] === 2) {
      return true;
    }
  }
  return false;
};

const isWeaklyIncreasing = function (i) {
  const str = i.toString();
  for (let j = 0; j < str.length - 1; j++) {
    if (str.charAt(j) > str.charAt(j + 1)) {
      return false;
    }
  }
  return true;
};

let validPasswords = [];
for (let i = start; i < stop; i++) {
  if (isWeaklyIncreasing(i) && hasEqualAdjacentDigits(i)) {
    validPasswords.push(i);
  }
}
console.log(validPasswords.length, validPasswords);
