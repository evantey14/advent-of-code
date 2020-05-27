const fs = require("fs");

const input = fs
  .readFileSync("day05/input.txt")
  .toString()
  .split("\n")
  .filter((i) => i.length > 0);

const intcode = input[0].split(",").map((i) => parseInt(i));

// Define parameter modes
const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;

// Define opcodes
const ADDITION = 1;
const MULTIPLICATION = 2;
const INPUT = 3;
const OUTPUT = 4;
const JUMPIFTRUE = 5;
const JUMPIFFALSE = 6;
const LESSTHAN = 7;
const EQUALS = 8;
const opcodes = [
  "",
  "ADD",
  "MULT",
  "INPUT",
  "OUTPUT",
  "JUMPIFTRUE",
  "JUMPIFFALSE",
  "LESSTHAN",
  "EQUALS",
];

const processIntcode = function (intcode, inputs) {
  let opcodeIndex = 0;
  outputs = [];
  while (intcode[opcodeIndex] !== 99) {
    //console.log("INDEX:", opcodeIndex, intcode.slice(opcodeIndex, opcodeIndex + 4));
    const [paramModes, opcode] = parseInstruction(intcode[opcodeIndex]);
    //console.log("INSTRUCTION:", opcodes[opcode]);
    const params = getParams(intcode, opcode, opcodeIndex, paramModes);
    //console.log("PARAMS:", params, "(PARAM MODES:", paramModes, ")");
    opcodeIndex = processOpcode(intcode, inputs, opcodeIndex, opcode, params);
    if (opcode === OUTPUT) {outputs.push(params[0])}
    //console.log(intcode.slice(0, 14), intcode[225]);
  }
  return outputs;
};

const parseInstruction = function (instruction) {
  const opcode = instruction % 100;
  const paramModes = Math.floor(instruction / 100)
    .toString()
    .padStart(3, "0")
    .split("")
    .reverse()
    .map((s) => parseInt(s));
  switch (opcode) {
    case ADDITION:
    case MULTIPLICATION:
    case LESSTHAN:
    case EQUALS: return [paramModes, opcode];
    case INPUT:
    case OUTPUT: return [paramModes.slice(0, 1), opcode];
    case JUMPIFTRUE:
    case JUMPIFFALSE: return [paramModes.slice(0, 2), opcode];
    default: throw `unrecognized opcode ${opcode}.`;
  }
};

const treatAsRef = function (paramMode) {
  switch (paramMode) {
    case POSITION_MODE: return true;
    case IMMEDIATE_MODE: return false;
    default: throw `unrecognized param mode ${paramMode}.`;
  }
};

const savingOpcode = function (opcode) {
  return [ADDITION, MULTIPLICATION, INPUT, LESSTHAN, EQUALS].includes(opcode);
};

const getParams = function (intcode, opcode, opcodeIndex, paramModes) {
  let params = [];
  for (let i = 0; i < paramModes.length; i++) {
    const param = intcode[opcodeIndex + 1 + i];
    params.push(treatAsRef(paramModes[i]) ? intcode[param] : param);
  }
  if (savingOpcode(opcode)) {
    // if opcode saves value to a file, force last param to the reference.
    const lastIndex = params.length - 1;
    params[lastIndex] = intcode[opcodeIndex + 1 + lastIndex];
  }
  return params;
};

const processOpcode = function (intcode, inputs, opcodeIndex, opcode, params) {
  switch (opcode) {
    case ADDITION:
      intcode[params[2]] = params[0] + params[1];
      return opcodeIndex + 4;
    case MULTIPLICATION:
      intcode[params[2]] = params[0] * params[1];
      return opcodeIndex + 4;
    case INPUT:
      intcode[params[0]] = inputs.shift();
      return opcodeIndex + 2;
    case OUTPUT: // gets handled outside this function
      return opcodeIndex + 2;
    case JUMPIFTRUE:
      return params[0] !== 0 ? params[1] : opcodeIndex + 3;
    case JUMPIFFALSE:
      return params[0] === 0 ? params[1] : opcodeIndex + 3;
    case LESSTHAN:
      intcode[params[2]] = params[0] < params[1] ? 1 : 0;
      return opcodeIndex + 4;
    case EQUALS:
      intcode[params[2]] = params[0] === params[1] ? 1 : 0;
      return opcodeIndex + 4;
    default:
      throw `unrecognized opcode ${opcode}.`;
  }
};

module.exports = { processIntcode };
console.log(intcode);
console.log(processIntcode(intcode, [5]));
