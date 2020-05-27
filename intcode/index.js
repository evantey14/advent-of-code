const helpers = require("./helpers");

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
const OPCODENAMES = ["", "ADD", "MULT", "IN", "OUT", "JT", "JF", "LT", "EQ"];
const NUMPARAMS = [null, 3, 3, 1, 1, 2, 2, 3, 3];
const SAVINGOPCODES = [ADDITION, MULTIPLICATION, INPUT, LESSTHAN, EQUALS];

class Intcode {
  constructor(memory) {
    this.memory = memory;
    this.pointer = 0;
    this.inputs = [];
    this.outputs = [];
    this.isRunning = true;
  }

  parseInstruction(instruction) {
    const opcode = instruction % 100;
    const paramModes = helpers
      .getParamModes(instruction)
      .slice(0, NUMPARAMS[opcode]);
    let params = [];
    for (let i = 0; i < paramModes.length; i++) {
      const param = this.memory[this.pointer + 1 + i];
      params.push(paramModes[i] === POSITION_MODE ? this.memory[param] : param);
    }
    if (SAVINGOPCODES.includes(opcode)) {
      // if opcode saves value to a file, force last param to the reference.
      const lastIndex = params.length - 1;
      params[lastIndex] = this.memory[this.pointer + 1 + lastIndex];
    }
    return [opcode, params];
  }

  processOpcode(opcode, params) {
    this.pointer += NUMPARAMS[opcode] + 1;
    switch (opcode) {
      case ADDITION:
        this.memory[params[2]] = params[0] + params[1];
        break;
      case MULTIPLICATION:
        this.memory[params[2]] = params[0] * params[1];
        break;
      case INPUT:
        if (this.inputs.length > 0) {
          this.memory[params[0]] = this.inputs.shift();
        } else {
          this.pointer -= NUMPARAMS[opcode] + 1;
        }
        break;
      case OUTPUT:
        this.outputs.push(params[0]);
        break;
      case JUMPIFTRUE:
        if (params[0] !== 0) {
          this.pointer = params[1];
        }
        break;
      case JUMPIFFALSE:
        if (params[0] === 0) {
          this.pointer = params[1];
        }
        break;
      case LESSTHAN:
        this.memory[params[2]] = params[0] < params[1] ? 1 : 0;
        break;
      case EQUALS:
        this.memory[params[2]] = params[0] === params[1] ? 1 : 0;
        break;
      default:
        throw `unrecognized opcode ${opcode}.`;
    }
  }

  run() {
    while (this.isRunning) {
      this.step();
    }
  }

  step() {
    if (this.memory[this.pointer] === 99) {
      this.isRunning = false;
    } else {
      //console.log('STATE:', this.toString());
      const [opcode, params] = this.parseInstruction(this.memory[this.pointer]);
      //console.log(OPCODENAMES[opcode], params);
      this.processOpcode(opcode, params);
    }
  }

  toString() {
    const p = this.pointer;
    return `${p} [${this.inputs}] [${this.outputs}] [${this.memory.slice(
      p,
      p + 10
    )}]`;
  }
}

module.exports = { Intcode };
