const fs = require("fs");

const input = fs
  .readFileSync("day02/input.txt")
  .toString()
  .split("\n")
  .filter((i) => i.length > 0);

const intcode = input[0].split(",").map((i) => parseInt(i));

const processInstruction = function (opcode, params, array) {
  const [index1, index2, index3] = params;
  if (opcode === 1) {
    array[index3] = array[index1] + array[index2];
  } else if (opcode === 2) {
    array[index3] = array[index1] * array[index2];
  }
};

const runIntCode = function (noun, verb) {
  let copy = [...intcode];
  (copy[1] = noun), (copy[2] = verb);
  for (let i = 0; i < copy.length; i += 4) {
    const opcode = copy[i];
    if (opcode === 99) {
      break;
    }
    const params = copy.slice(i + 1, i + 4);
    processInstruction(opcode, params, copy);
  }
  return copy[0];
};

// We're looking for the inputs that yield 19690720
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (runIntCode(i, j) === 19690720) {
      console.log(i, j);
      break;
    }
  }
}
