const [_, file = "input"] = Deno.args;
const data = await Deno.readTextFile(`day04/${file}.txt`) satisfies string;

const grid = data.split("\n").filter((l) => l.length > 0).map((l) =>
  l.split("")
);

console.log(grid.map((row) => row.join("")).join("\n"));

function getSurroundingRolls(i: number, j: number, grid: string[][]): number {
  let surroundingRolls = 0;

  const adjacentPositions = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];

  for (const position of adjacentPositions) {
    if (
      position[0] < 0 || position[0] > grid.length - 1 || position[1] < 0 ||
      position[1] > grid[0].length - 1
    ) {
      continue;
    }

    if (grid[position[0]][position[1]] === "@") {
      surroundingRolls++;
    }
  }
  return surroundingRolls;
}

let totalRemoved = 0;
let removedThisRound = 1; // start non-zero for the while loop

while (removedThisRound > 0) {
  removedThisRound = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "@" && getSurroundingRolls(i, j, grid) < 4) {
        grid[i][j] = ".";
        removedThisRound++;
      }
    }
  }
  totalRemoved += removedThisRound;
}

console.log(totalRemoved);
