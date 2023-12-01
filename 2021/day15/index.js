// const MinPriorityQueue = require('@datastructures-js/priority-queue')
const {
    PriorityQueue,
    MinPriorityQueue,
    MaxPriorityQueue
} = require('@datastructures-js/priority-queue');
const fs = require("fs");

const input = fs
  .readFileSync("day15/input.txt")
  .toString()
  .split("\n")

function print(grid) {
    console.log(
        grid.map(
            row => row.map(
                i => String(i).padStart(6, " ")
            ).join("")
        ).join("\n")
    );
}

let risk = input.map(row => row.split("").map(i => parseInt(i)));
let bigRisk = new Array(5 * risk.length).fill(0).map(() => new Array(5 * risk[0].length).fill(0));
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        for (let x = 0; x < risk.length; x++) {
            for (let y = 0; y < risk[x].length; y++) {
                bigRisk[i * risk.length + x][j * risk[x].length + y] = (risk[x][y] + i + j - 1) % 9 + 1;
            }
        }
    }
}
risk = bigRisk

let minRisk = new Array(risk.length).fill(0).map(() => new Array(risk[0].length).fill(Number.POSITIVE_INFINITY));
minRisk[0][0] = 0;
// print(minRisk)

let visited = new Array(risk.length).fill(0).map(() => new Array(risk[0].length).fill(false));

const queue = new MinPriorityQueue({ priority: p => p.value});
queue.enqueue({ value: 0, x: 0, y: 0 });
while(queue.size() > 0) {
    const point = queue.dequeue().element;
    const x = point.x;
    const y = point.y
    if (x === risk.length - 1 && y === risk[0].length - 1) {
        console.log(minRisk[x][y]);
        break;
    }

    if (visited[x][y]) continue;
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        let [dx, dy] = [x + [0, 1, 0, -1][i], y + [1, 0, -1, 0][i]];
        if (dx >= 0 && dx < risk.length && dy >= 0 && dy < risk[0].length && !visited[dx][dy]) {
            minRisk[dx][dy] = Math.min(minRisk[dx][dy], minRisk[x][y] + risk[dx][dy]);
            queue.enqueue({ value: minRisk[dx][dy], x: dx, y: dy });
        }
    }
}