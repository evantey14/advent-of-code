const { Intcode } = require("../intcode");

const BLACK = "."; // 0
const WHITE = "#"; // 1

const STEP_UP = [-1, 0];
const STEP_RIGHT = [0, 1];
const STEP_DOWN = [1, 0];
const STEP_LEFT = [0, -1];

const mod4 = i => ((i % 4) + 4) % 4;

class Robot {
  constructor(program) {
    this.intcode = new Intcode(program);
    this.orientation = 0;
  }

  processSquare(input) {
    this.intcode.inputs.push(input === BLACK ? 0 : 1);
    while (this.intcode.outputs.length < 2 && this.intcode.isRunning) {
      this.intcode.step();
    }
    const color = this.intcode.outputs.shift();
    const turn = this.intcode.outputs.shift();
    const deltaOrientation = turn === 0 ? -1 : 1;
    this.orientation = mod4(this.orientation + deltaOrientation);
    return color === 0 ? BLACK : WHITE;
  }

  getStep() {
    switch (this.orientation) {
      case 0:
        return STEP_UP;
      case 1:
        return STEP_RIGHT;
      case 2:
        return STEP_DOWN;
      case 3:
        return STEP_LEFT;
    }
  }
}

module.exports = { Robot };
