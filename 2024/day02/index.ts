import fs from "node:fs";

const input = fs.readFileSync("./day02/input.txt", "utf8");
console.log(input);

const lines = input.split("\n").filter((line) => line.length > 0);
console.log(lines);

const numbers = lines.map((line) =>
	line.split(" ").map((i) => Number.parseInt(i)),
);
console.log(numbers);

function isSafe(line: number[]) {
	const differences = line
		.map((i, j) => line[j] - line[j + 1])
		.filter((i) => !Number.isNaN(i));

	console.log(differences);

	return (
		differences.every((i) => 1 <= Math.abs(i) && Math.abs(i) <= 3) &&
		differences.every((num, _, arr) => Math.sign(num) === Math.sign(arr[0]))
	);
}

const safe = numbers.map((line) =>
	line.some((_, i) => isSafe(line.slice(0, i).concat(line.slice(i + 1)))),
);

console.log(safe.filter((i) => i).length);
