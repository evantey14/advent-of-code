const fs = require("fs");
const { Intcode } = require("../intcode");

const input = fs
  .readFileSync("day09/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const program = input[0].split(",").map(s => parseInt(s));
console.log(program);

let intcode = new Intcode(program);
intcode.inputs = [2];
intcode.run();

console.log(intcode.outputs);
