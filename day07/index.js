const fs = require("fs");
const day05 = require("../day05");

const input = fs
  .readFileSync("day07/input.txt")
  .toString()
  .split("\n")
  .filter((i) => i.length > 0);
const intcode = input[0].split(",").map((s) => parseInt(s));

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

const runAmplifiers = function (intcode, phaseSetting) {
  let lastOutput = 0; // default input for first Amp
  for (let i = 0; i < 5; i++) {
    const input = [phaseSetting[i], lastOutput];
    lastOutput = day05.processIntcode([...intcode], input)[0];
  }
  return lastOutput;
};

const possiblePhaseSettings = generatePermutations([0, 1, 2, 3, 4]);

const ampOutputs = possiblePhaseSettings.map((s) => runAmplifiers(intcode, s));
const maxValue = ampOutputs.reduce((a, b) => Math.max(a, b));
console.log(maxValue);
