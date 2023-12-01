const fs = require("fs");

const input = fs
  .readFileSync("day14/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

let polymer = input[0];
console.log(polymer);

const rules = {};
const pairRules = {}
for (let i = 1; i < input.length; i++) {
    const rule = input[i].split(" -> ");
    rules[rule[0]] = rule[1];
    pairRules[rule[0]] = [rule[0][0] + rule[1], rule[1] + rule[0][1]];
}
console.log(rules);
console.log(pairRules);

function run(polymer, rules) {
    let newPolymer = "";
    for (let i = 0; i < polymer.length - 1; i++) {
        const pair = polymer[i] + polymer[i + 1];
        const newChar = rules[pair];
        newPolymer += pair[0] + newChar;
    }
    return newPolymer + polymer[polymer.length - 1];
}

function runOptimized(pairs, pairRules) {
    let newPairs = {};
    for (let pair in pairs) {
        for (let out of pairRules[pair]) {
            if (!(out in newPairs)) {
                newPairs[out] = 0;
            }
            newPairs[out] += pairs[pair];
        }
    }
    return newPairs;
}

function getOutput(polymer) {
    let counts = {}
    for (let i = 0; i < polymer.length; i++) {
        const char = polymer[i];
        if (counts[char]) {
            counts[char]++;
        } else {
            counts[char] = 1;
        }
    }
    const sorted_counts = Object.values(counts).sort((a, b) => a - b);
    return sorted_counts[sorted_counts.length - 1] - sorted_counts[0];
}
// for (let i = 0; i < 10; i++) {
    // polymer = run(polymer, rules);
    // console.log(polymer.length);
    // console.log(i+1, getOutput(polymer));
// }

let pairs = {};
for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer[i] + polymer[i + 1];
    if (pair in pairs) {
        pairs[pair]++;
    } else {
        pairs[pair] = 1;
    }
}

function getOptimizedOutput(pairs) {
    let counts = {}
    for (let pair in pairs) {
        for (let i = 0; i < 2; i ++) {
            if (!(pair[i] in counts)) {
                counts[pair[i]] = 0;
            }
            counts[pair[i]] += pairs[pair] / 2;
        }
    }
    const sorted_counts = Object.values(counts).sort((a, b) => a - b);
    return sorted_counts[sorted_counts.length - 1] - sorted_counts[0];
}

for (let i = 0; i < 40; i++) {
    console.log(pairs);
    pairs = runOptimized(pairs, pairRules);
    console.log(i+1, getOptimizedOutput(pairs));
}