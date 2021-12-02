class Memory {
  constructor(program) {
    this.tape = program;
  }

  get(index) {
    const proposal = this.tape[index];
    return proposal ? proposal : 0;
  }

  set(index, value) {
    this.tape[index] = value;
  }
}

module.exports = { Memory };
