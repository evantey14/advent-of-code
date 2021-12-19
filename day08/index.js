const { strictEqual } = require("assert");
const fs = require("fs");

const input = fs
  .readFileSync("day08/input.txt")
  .toString()
  .split("\n")

const signals = (
    input
    .map(i => i.split(" | ")[0])
    .map(i => (
        i.split(" ").sort((a, b) => a.length - b.length).map(i => new Set(i.split("")))
    ))
);

console.log(signals);

const one_overlap = signals.map(signal => (
    signal.map(i => [...i].filter(j => signal[0].has(j)).length)
));

const four_overlap = signals.map(signal => (
    signal.map(i => [...i].filter(j => signal[2].has(j)).length)
));

// 1: 2 segments
// 2: 5 segments, shares 1 from 1, 2 from 4, 2 from 7
// 3: 5 segments, shares 2 from 1, 3 from 4, 3 from 7
// 4: 4 segments
// 5: 5 segments, shares 1 from 1, 3 from 4, 2 from 7
// 6: 6 segments, shares 1 from 1
// 7: 3 segments
// 8: 7 segments
// 9: 6 segments, shares 2 from 1, 4 from 4
// 0: 6 segments, shares 2 from 1, 3 from 4

let maps = [];
for (let i = 0; i < signals.length; i++) {
    let map = new Array(10).fill(0);
    for (let j = 0; j < signals[i].length; j++) {
        if (j === 0) {
            map[1] = signals[i][j];
        } else if (j === 1) {
            map[7] = signals[i][j];
        } else if (j === 2) {
            map[4] = signals[i][j];
        } else if (j === 9) {
            map[8] = signals[i][j];
        } else if (signals[i][j].size === 6) {
            if (one_overlap[i][j] === 1) {
                map[6] = signals[i][j];
            } else if (four_overlap[i][j] === 3) {
                map[0] = signals[i][j];
            } else {
                map[9] = signals[i][j];
            }
        } else if (signals[i][j].size === 5) {
            if (four_overlap[i][j] === 2) {
                map[2] = signals[i][j];
            } else if (one_overlap[i][j] === 1) {
                map[5] = signals[i][j];
            } else {
                map[3] = signals[i][j];
            }
        }
    }
    maps.push(map);
}

console.log(maps);

const outputs = (
    input
    .map(i => i.split(" | ")[1])
    .map(i => i.split(" ").map(i => new Set(i.split(""))))
);

console.log(outputs);

// original part 1 code
// console.log(outputs.reduce(
    // (acc, curr) => acc + curr.filter(i => i.length < 5 || i.length === 7).length
// , 0));

function equal(a, b) {
    return a.size === b.size && [...a].every(i => b.has(i));
}
const decoded = (
    outputs.map((output, i) => (
        output.map(o => maps[i].findIndex(m => equal(o, m)))
    ))
);

console.log(decoded);

console.log(decoded.map(
    i => parseInt(i.map(i => ""+i).join(""))
).reduce((acc, curr) => acc + curr, 0));