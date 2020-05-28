const { Intcode } = require("../intcode");

class Amplifiers {
  constructor(program, settings) {
    this.amplifiers = [...Array(5).keys()].map(s => new Intcode([...program]));
    this.settings = settings;
    for (let i = 0; i < this.amplifiers.length; i++) {
      this.amplifiers[i].inputs.push(settings[i]);
    }
    this.amplifiers[0].inputs.push(0);
  }

  run() {
    while (this.amplifiers.some(a => a.isRunning)) {
      for (let i = 0; i < this.amplifiers.length; i++) {
        const a = this.amplifiers[i];
        if (a.isRunning) {
          a.step();
        }
        if (a.outputs.length > 0) {
          this.amplifiers[(i + 1) % 5].inputs.push(a.outputs.shift());
        }
      }
    }
    const output = this.amplifiers[0].inputs[0]; // this is where the final output should end up
    return output;
  }
}

module.exports = { Amplifiers };
