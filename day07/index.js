const fs = require("fs");
const { Amplifiers } = require("./amplifiers");

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

const settings = [0, 1, 2, 3, 4].map((x) => x + 5);
const possiblePhaseSettings = generatePermutations(settings);
const possibleAmplifiers = possiblePhaseSettings.map(
  (s) => new Amplifiers(program, s)
);
const ampOutputs = possibleAmplifiers.map((a) => a.run());
const maxValue = ampOutputs.reduce((a, b) => Math.max(a, b));
console.log(maxValue);
