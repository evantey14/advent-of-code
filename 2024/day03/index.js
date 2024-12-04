import fs from "node:fs";
import { sum } from "lodash-es"

const input = fs.readFileSync("./day03/input.txt", "utf8");
console.log(input);

const regex = /(?:mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;

const matches = input.match(regex);
console.log(matches);

const products = [];
let enabled = true;

for (const match of matches) {
    if (match === "do()") {
        enabled = true;
    } else if (match === "don't()") {
        enabled = false;
	} else {
		if (enabled) {
			const [x, y] = match.slice(4, -1).split(",");
			products.push(Number.parseInt(x)* Number.parseInt(y));
		}
	}
}

console.log(products);

console.log(sum(products))