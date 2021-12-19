const fs = require("fs");

const input = fs
  .readFileSync("day11/input.txt")
  .toString()
  .split("\n")

let octopi = input.map(line => line.split("").map(i => parseInt(i)));

console.log(octopi);

function printOctopi(octopi) {
    octopi.forEach(row => { console.log(row.join(" ")); });
    console.log("\n");
}

function getFlashes(octopi) {
    return octopi.map(row => row.map(i => i > 9));
}

function arrayEquals(array1, array2) {
    return array1.every((row, i) => row.every((cell, j) => cell === array2[i][j]));
}

function getNeighbors(octopi, i, j) {
    let neighbors = [];
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if (x === i && y === j) continue;
            if (x < 0 || y < 0) continue;
            if (x >= octopi.length || y >= octopi[0].length) continue;
            neighbors.push([x, y]);
        }
    }
    return neighbors;
}


function getNewOctopi(octopi, alreadyFlashed, newFlashes) {
    let newOctopi = octopi;
    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[i].length; j++) {
            if (!alreadyFlashed[i][j] && newFlashes[i][j]) {
                let neighbors = getNeighbors(octopi, i, j);
                for (let n of neighbors) {
                    newOctopi[n[0]][n[1]] += 1;
                }
            }
        }
    }
    return newOctopi;
}

function run(octopi) {
    let alreadyFlashed = new Array(10).fill(0).map(i => new Array(10).fill(false));
    let newOctopi = octopi.map(row => row.map(i => i + 1));
    while (!arrayEquals(alreadyFlashed, getFlashes(newOctopi))) {
        let newFlashes = getFlashes(newOctopi);
        newOctopi = getNewOctopi(newOctopi, alreadyFlashed, newFlashes);
        alreadyFlashed = newFlashes;
        // printOctopi(newOctopi);
    }
    const flashes = alreadyFlashed.map(row => row.filter(i => i).length).reduce((a, b) => a + b, 0);
    return [newOctopi.map(row => row.map(i => i > 9 ? 0 : i)), flashes];
}

let totalFlashes = 0;
let flashes = 0;
for (let i = 0; i < 1000; i++) {
    [octopi, flashes] = run(octopi);
    totalFlashes += flashes;
    if (flashes === 100) {
        console.log(i);
        break;
    }
}
console.log(totalFlashes);