const fs = require("fs");

const input = fs
  .readFileSync("day13/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const points = input.filter(i => i[0] !== "f").map(i => i.split(",").map(i => parseInt(i)));
console.log(points);

const folds = input.filter(i => i[0] === "f").map(i => i.split(" ")[2].split("="));
console.log(folds);

const maxX = points.reduce((acc, cur) => Math.max(acc, cur[0]), 0);
const maxY = points.reduce((acc, cur) => Math.max(acc, cur[1]), 0);
console.log(maxX, maxY);

function printPaper(paper) {
    console.log(paper.map(row => row.join("")).join("\n"), "\n");
}

let paper = new Array(maxY + 1).fill(0).map(row => new Array(maxX + 1).fill(0));
printPaper(paper);

points.forEach(point => {
    paper[point[1]][point[0]] = 1;
});

printPaper(paper);

function countOnes(paper) {
    return paper.reduce((acc, cur) => acc + cur.reduce((acc, cur) => acc + cur, 0), 0);
}

console.log(countOnes(paper));

function fold(paper, axis, value) {
    if (axis === "x") {
        for (let col = value + 1; col < paper[0].length; col++) {
            for (let row = 0; row < paper.length; row++) {
                if (paper[row][col] === 0) continue;
                paper[row][value - (col - value)] = paper[row][col];
                paper[row][col] = 0;
            }
        }
    } else if (axis === "y") {
        for (let row = value + 1; row < paper.length; row++) {
            for (let col = 0; col < paper[0].length; col++) {
                if (paper[row][col] === 0) continue;
                paper[value - (row - value)][col] = paper[row][col];
                paper[row][col] = 0;
            }
        }
    }
    return paper;
}

console.log(folds);
for (const f of folds) {
    paper = fold(paper, f[0], parseInt(f[1]));
    // printPaper(paper);
    // console.log(countOnes(paper));
}
printPaper(paper.map(row => row.slice(0, 50).map(i => i ? 1 : " ")).slice(0, 10));
