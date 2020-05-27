const fs = require("fs");
const { Intcode } = require("../intcode");

const input = fs
  .readFileSync("day07/input.txt")
  .toString()
  .split("\n")
  .filter((i) => i.length > 0);
const program = input[0].split(",").map((s) => parseInt(s));

const generatePermutations = function (list) {
  if (list.length === 1) {
    return list.map((l) => [l]);
  }
  let permutations = [];
  for (let el of list) {
    const innerPermutations = generatePermutations(
      [...list].filter((e) => e !== el)
    );
    for (let ip of innerPermutations) {
      permutations.push([el, ...ip]);
    }
  }
  return permutations;
};

const runAmplifiers = function (phaseSetting) {
  const amplifiers = [...Array(5).keys()].map((s) => new Intcode(program));
  let lastOutput = 0; // default input for first Amp
  for (let i = 0; i < 5; i++) {
    amplifiers[i].inputs = [phaseSetting[i], lastOutput];
    amplifiers[i].run();
    lastOutput = amplifiers[i].outputs[0];
  }
  return lastOutput;
};

const possiblePhaseSettings = generatePermutations([0, 1, 2, 3, 4]);

const ampOutputs = possiblePhaseSettings.map(runAmplifiers);
const maxValue = ampOutputs.reduce((a, b) => Math.max(a, b));
console.log(maxValue);
