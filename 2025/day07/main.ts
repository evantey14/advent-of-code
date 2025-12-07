import { sum } from "lodash-es"

const [_, file = "input"] = Deno.args
const data = await Deno.readTextFile(`day07/${file}.txt`) satisfies string

const grid = data
  .split("\n")
  .filter((l) => l.length > 0)
  .map((l) =>
    l.split("").map((i) => {
      if (i === "S") {
        return 1
      } else if (i === "^") {
        return -1
      } else {
        return 0
      }
    })
  )

console.log(grid.map((r) => r.join("")))

let splitCounter = 0
for (let i = 1; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === -1 && grid[i - 1][j] > 0) {
      splitCounter += 1
      grid[i][j - 1] += grid[i - 1][j]
      grid[i][j + 1] += grid[i - 1][j]
    } else if (grid[i - 1][j] > 0) {
      grid[i][j] += grid[i - 1][j]
    }
  }
}

console.log(splitCounter)

console.log(sum(grid[grid.length - 1]))
