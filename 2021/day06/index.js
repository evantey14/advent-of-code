const fs = require("fs");

const input = fs
  .readFileSync("day06/input.txt")
  .toString()
  .split("\n")[0]
  .split(",")
  .map(i => parseInt(i));

console.log(input);
console.log(input.filter(j => j === 4).length);

let state = Array(9).fill(0).map((e, i) => input.filter(j => j === i).length);
console.log(state);

function run(state) {
    let new_state = state.slice(1);
    const num_of_zeros = state[0];
    new_state.push(num_of_zeros);
    new_state[6] += num_of_zeros;
    return new_state;
}

for (let i = 0; i < 256; i++) {
    state = run(state);
}
console.log(state);
console.log(state.reduce((a, b) => a + b));