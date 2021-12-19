const fs = require("fs");

const input = fs
  .readFileSync("day09/input.txt")
  .toString()
  .split("\n").map(i => i.split("").map(i => parseInt(i)));


console.log(input);

function getNeighbors(matrix, x, y) {
    let neighbors = [];

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i == x && j == y) {
                continue;
            }
            if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) {
                continue;
            }
            if (i - x + j - y !== 1 && i - x + j - y !== -1) {
                continue;
            }
            neighbors.push({x: i, y: j});
        }
    }
    return neighbors;
}


let sum = 0;
let lowPoints = [];
for (let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[i].length; j++) {
        const current = input[i][j];
        const neighbors = getNeighbors(input, i, j);
        if (neighbors.filter(n => input[n.x][n.y] <= current).length === 0) {
            console.log("FOUND", i, j, current, neighbors);
            lowPoints.push({x: i, y: j});
            sum += current + 1;
        }
    }
}

console.log(sum);
// console.log(lowPoints);

function findBasinSize(matrix, x, y) {
    let size = 1;
    let queue = [{x: x, y: y}];
    let seen = [{x: x, y: y}];
    console.log("START", x, y);
    while (queue.length > 0) {
        const current = queue.shift();
        const neighbors = getNeighbors(matrix, current.x, current.y);
        for (let n of neighbors) {
            if (matrix[n.x][n.y] > matrix[current.x][current.y] && matrix[n.x][n.y] !== 9) {
                if (!seen.find(s => s.x === n.x && s.y === n.y)) {
                    queue.push(n);
                    seen.push(n);
                    size++;
                }
                // size++;
                // console.log(n, matrix[n.x][n.y]);
                // queue.push(n);
            }
        }
    }
    return size;
}

let basinSizes = lowPoints.map(p => findBasinSize(input, p.x, p.y));
console.log(lowPoints)
console.log(basinSizes);

console.log(basinSizes.sort((a, b) => b - a));