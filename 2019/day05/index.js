const fs = require("fs");

const input = fs
  .readFileSync("day05/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const program = input[0].split(",").map(i => parseInt(i));

const { Intcode } = require("../intcode");
let intcode = new Intcode(program);
intcode.inputs = [5];
intcode.run();
console.log(intcode.outputs);
