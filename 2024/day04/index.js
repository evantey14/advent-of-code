import fs from "node:fs";

const input = fs.readFileSync("./day04/input.txt", "utf8");
console.log(input);

const grid = input.split("\n").map((line) => line.split(""));
console.log(grid);

const directions = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
	[1, 1],
	[-1, -1],
	[1, -1],
	[-1, 1],
];

function countXMASes(grid, i, j) {
	const strings = ["", "", "", "", "", "", "", ""];
	for (let m = 0; m < 4; m++) {
		for (let n = 0; n < directions.length; n++) {
			const x = i + m * directions[n][0];
			const y = j + m * directions[n][1];
			if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
				strings[n] = strings[n] + grid[x][y];
			}
		}
	}
	return strings.filter((string) => string === "XMAS").length;
}

function countSAMCrosses(grid, i, j) {
	const neighbors = [];
	for (let n = 0; n < directions.length; n++) {
		const x = i + directions[n][0];
		const y = j + directions[n][1];
		if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) {
			neighbors.push(grid[x][y]);
		}
	}

	if (neighbors.length < 8) {
		return 0;
	}

	const forward = [neighbors[4], neighbors[5]].sort().join("");
	const backward = [neighbors[6], neighbors[7]].sort().join("");

	return forward === "MS" && backward === "MS" ? 1 : 0;
}

let xmasCount = 0;
let samCount = 0;
for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
		if (grid[i][j] === "X") {
			xmasCount += countXMASes(grid, i, j);
		}
		if (grid[i][j] === "A") {
			samCount += countSAMCrosses(grid, i, j);
		}
	}
}

console.log(xmasCount);
console.log(samCount);
