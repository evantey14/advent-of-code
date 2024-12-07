import fs from "node:fs";
import { sum } from "lodash-es";

const input = fs.readFileSync("./day05/input.txt", "utf8");
console.log(input);

const [sectionOne, sectionTwo] = input.split("\n\n");

console.log(sectionOne);
console.log(sectionTwo);

const precursors = new Map();
for (const line of sectionOne.split("\n")) {
	const [precursor, current] = line.split("|").map((s) => s.trim());
	if (!precursors.has(current)) {
		precursors.set(current, new Set());
	}
	precursors.get(current).add(precursor);
}

console.log(precursors);

const updates = sectionTwo.split("\n").map((line) => line.split(","));

console.log(updates);

function intersection(setA, setB) {
	return new Set([...setA].filter((x) => setB.has(x)));
}

const validUpdates = updates.filter((update) => {
	const seen = new Set();
	for (let i = update.length - 1; i >= 0; i--) {
		const item = update[i];

		const seenPrecursors = intersection(
			seen,
			precursors.get(item) ?? new Set(),
		);

		console.log(item, seen, precursors.get(item) ?? new Set(), seenPrecursors);

		if (seenPrecursors.size > 0) {
			return false;
		}

		seen.add(item);
	}
	return true;
});

console.log(validUpdates);

function topologicalSort(items) {
	const order = [];
	const uniqueItems = [...new Set(items)]; // Remove duplicates from input

	// Create a new graph for this specific sequence
	const graph = new Map();
	for (const item of uniqueItems) {
		graph.set(item, new Set()); // Initialize with empty Set
		const itemPrecursors = precursors.get(item);
		if (itemPrecursors instanceof Set) {
			// Only add precursors that are in our item list
			for (const precursor of itemPrecursors) {
				if (uniqueItems.includes(precursor)) {
					graph.get(item).add(precursor);
				}
			}
		}
	}

	const visited = new Set();
	function visit(item, temp = new Set()) {
		if (temp.has(item)) return null; // Cycle detected
		if (visited.has(item)) return true;

		temp.add(item);

		// Visit all precursors first
		const itemPrecursors = graph.get(item) ?? new Set();
		for (const precursor of itemPrecursors) {
			const result = visit(precursor, temp);
			if (result === null) return null; // Propagate cycle detection
		}

		temp.delete(item);
		visited.add(item);
		order.push(item);
		return true;
	}

	// Try to visit each item
	for (const item of uniqueItems) {
		if (!visited.has(item)) {
			const result = visit(item, new Set());
			if (result === null) return null; // Return null if cycle detected
		}
	}

	return order.reverse(); // Reverse to get correct order
}

const invalidUpdates = updates.filter(
	(update) => !validUpdates.includes(update),
);
const correctedUpdates = invalidUpdates.map((update) => {
	const sorted = topologicalSort(update);
	return sorted ?? update; // If sorting failed (due to cycles), keep original
});

console.log("Invalid updates with corrected ordering:", correctedUpdates);

console.log(
	sum(
		validUpdates.map((update) =>
			Number.parseInt(update[Math.floor(update.length / 2)]),
		),
	),
);

console.log(invalidUpdates);
console.log(correctedUpdates);

console.log(
	sum(
		correctedUpdates.map((update) =>
			Number.parseInt(update[Math.floor(update.length / 2)]),
		),
	),
);
