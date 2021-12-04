const fs = require("fs");

const input = fs
  .readFileSync("day03/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

console.log(input);

function countZeros(strings, position) {
  let zero_counts = 0;
  for (const bitstring of strings) {
    if (bitstring[position] === "0") {
      zero_counts++;
    }
  }
  return zero_counts;
}

function findMostCommonBit(strings, position) {
  let zero_count = countZeros(strings, position);
  return zero_count > strings.length / 2 ? "0" : "1";
}

function findLeastCommonBit(strings, position) {
  let zero_count = countZeros(strings, position);
  console.log("ZERO COUNT", zero_count);
  return zero_count > strings.length / 2 ? "1" : "0";
}

let o2_bitstrings = input;
let co2_bitstrings = input;

for (let pos = 0; pos < input[0].length; pos++) {
  if (o2_bitstrings.length > 1) {
    let mostCommonBit = findMostCommonBit(o2_bitstrings, pos);
    o2_bitstrings = o2_bitstrings.filter(i => i[pos] === mostCommonBit);
  }

  if (co2_bitstrings.length > 1) {
    let leastCommonBit = findLeastCommonBit(co2_bitstrings, pos);
    co2_bitstrings = co2_bitstrings.filter(i => i[pos] === leastCommonBit);
  }
  console.log(o2_bitstrings.length, co2_bitstrings.length);
}
console.log(o2_bitstrings, co2_bitstrings);
console.log(parseInt(o2_bitstrings[0], 2) * parseInt(co2_bitstrings[0], 2));