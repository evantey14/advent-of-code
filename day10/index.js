const fs = require("fs");

const input = fs
  .readFileSync("day10/input.txt")
  .toString()
  .split("\n")

function getOutput(paren_str) {
    let stack = [];
    for (let i = 0; i < paren_str.length; i++) {
        if ("{<([".indexOf(paren_str[i]) > -1) {
            stack.push(paren_str[i]); 
        } else {
            if (stack.length === 0) {
                return paren_str[i];
            }
            let last = stack.pop();
            if (last === "{" && paren_str[i] !== "}") {
                return paren_str[i];
            }
            if (last === "(" && paren_str[i] !== ")") {
                return paren_str[i];
            }
            if (last === "[" && paren_str[i] !== "]") {
                return paren_str[i];
            }
            if (last === "<" && paren_str[i] !== ">") {
                return paren_str[i];
            }
        }
    }
    return stack.reverse().join("");
}

let output = input.map(i => getOutput(i));

const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}

console.log(output);
console.log(output.reduce((acc, i) => i.length > 1 ? acc : acc + points[i], 0));

let incomplete = output.filter(i => i.length > 1);
console.log(incomplete);

const completionPoints = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
}

const scores = (incomplete.map(s => (
    s.split("").reduce((acc, i) => 5 * acc + completionPoints[i], 0)
)).sort((a, b) => a - b));

console.log(scores.length, scores);
console.log(scores[25]);