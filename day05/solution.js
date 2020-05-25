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

const processIntcode = function (intcode, input) {
  let opcodeIndex = 0;
  while (intcode[opcodeIndex] !== 99) {
    //console.log("INDEX:", opcodeIndex);
    const [paramModes, opcode] = parseInstruction(intcode[opcodeIndex]);
    //console.log("INSTRUCTION:", paramModes, opcode);
    const params = getParams(intcode, opcode, opcodeIndex, paramModes);
    //console.log("PARAMS:", params);
    processOpcode(intcode, input, opcode, params);
    //console.log(intcode.slice(0, 14), intcode[225]);
    opcodeIndex = updateOpcodeIndex(opcode, opcodeIndex);
  }
};

const parseInstruction = function (instruction) {
  const opcode = instruction % 100;
  let paramModes = [];
  switch (opcode) {
    case ADDITION:
    case MULTIPLICATION:
      const frontDigits = Math.floor(instruction / 100)
        .toString()
        .padStart(4, "0");
      paramModes = frontDigits
        .split("")
        .reverse()
        .map((s) => parseInt(s));
      break;
    case INPUT:
    case OUTPUT:
      paramModes = [Math.floor(instruction / 100)];
      break;
  }
  return [paramModes, opcode];
};

const treatAsRef = function (paramMode) {
  switch (paramMode) {
    case POSITION_MODE: return true;
    case IMMEDIATE_MODE: return false;
    default: throw `unrecognized param mode ${paramMode}.`;
  }
};

const getParams = function (intcode, opcode, opcodeIndex, paramModes) {
  switch (opcode) {
    case ADDITION:
    case MULTIPLICATION:
      let param1 = intcode[opcodeIndex + 1];
      let param2 = intcode[opcodeIndex + 2];
      param1 = treatAsRef(paramModes[0]) ? intcode[param1] : param1;
      param2 = treatAsRef(paramModes[1]) ? intcode[param2] : param2;
      return [param1, param2, intcode[opcodeIndex + 3]];
    case INPUT:
      return [intcode[opcodeIndex + 1]];
    case OUTPUT:
      let param = intcode[opcodeIndex + 1];
      param = treatAsRef(paramModes[0]) ? intcode[param] : param;
      return [param];
    default:
      throw `unrecognized opcode ${opcode}.`;
  }
};

const processOpcode = function (intcode, input, opcode, params) {
  switch (opcode) {
    case ADDITION:
      intcode[params[2]] = params[0] + params[1];
      break;
    case MULTIPLICATION:
      intcode[params[2]] = params[0] * params[1];
      break;
    case INPUT:
      intcode[params[0]] = input;
      break;
    case OUTPUT:
      console.log(params[0]);
      break;
    default:
      throw `unrecognized opcode ${opcode}.`;
  }
};

const updateOpcodeIndex = function (opcode, index) {
  switch (opcode) {
    case ADDITION:
    case MULTIPLICATION: return index + 4;
    case INPUT:
    case OUTPUT: return index + 2;
    default: throw `unrecognized opcode ${opcode}.`;
  }
};

console.log(intcode);
processIntcode(intcode, 1);
