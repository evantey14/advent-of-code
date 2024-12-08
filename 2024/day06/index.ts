import fs from "node:fs";

const input = fs.readFileSync("./day06/input.txt", "utf8");
console.log(input);

const grid: string[] = input.split("\n").filter((line) => line.length > 0);
console.log(grid);

const directions = [
	[-1, 0], // up
	[0, 1], // right
	[1, 0], // down
	[0, -1], // left
] as const;

type State = {
	row: number;
	column: number;
	direction: (typeof directions)[number];
};

function findInitialState(grid: string[]): State {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "^") {
				return { row: i, column: j, direction: directions[0] };
			}
		}
	}
	return { row: 0, column: 0, direction: directions[0] };
}

function isOnGrid(row: number, column: number, grid: string[]): boolean {
	return (
		row >= 0 && row < grid.length && column >= 0 && column < grid[row].length
	);
}

function getNextState(state: State, grid: string[]): State | null {
	const { row, column, direction } = state;
	const nextRow = row + direction[0];
	const nextColumn = column + direction[1];
	const nextDirection = directions[(directions.indexOf(direction) + 1) % 4];

	if (!isOnGrid(nextRow, nextColumn, grid)) {
		return null;
	}

	if (grid[nextRow][nextColumn] === "#") {
		return { row, column, direction: nextDirection };
	}

	return { row: nextRow, column: nextColumn, direction };
}

function serialize(state: State): string {
	return `${state.row},${state.column}:${state.direction[0]},${state.direction[1]}`;
}

function evolve(state: State, grid: string[]): Set<string> | null {
	let currentState = state;
	const history = new Set<string>();
	history.add(serialize(state));

	while (true) {
		history.add(serialize(currentState));

		const nextState = getNextState(currentState, grid);

		if (nextState === null) {
			return history;
		}

		if (history.has(serialize(nextState))) {
			return null;
		}

		currentState = nextState;
	}
}

const state = findInitialState(grid);

console.log(state);

const history = evolve(findInitialState(grid), grid);

if (history != null) {
	console.log(history.size);

	const positions = new Set(
		Array.from(history).map((serializedState) => serializedState.split(":")[0]),
	);

	console.log(positions.size);
} else {
	console.log("found cycle");
}

let cycles = 0;

console.log(grid.length, grid[0].length);

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
		if (grid[i][j] === ".") {
			const newGrid = [...grid].map((row, k) => {
				if (i === k) {
					return `${row.slice(0, j)}#${row.slice(j + 1)}`;
				}
				return row;
			});

			const history = evolve(state, newGrid);

			if (history == null) {
				cycles += 1;
			}
		}
	}
}

console.log(cycles);
