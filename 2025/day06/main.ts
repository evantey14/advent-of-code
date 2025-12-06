import { sum, zip } from "lodash-es"

const product = (array: number[]) =>
  array.reduce((product, current) => product * current, 1)

const transpose = <T>(array: T[][]): T[][] => zip(...array)

const [_, file = "input"] = Deno.args
const data = await Deno.readTextFile(`day06/${file}.txt`) satisfies string

const grid = data
  .split("\n")
  .filter((l) => l.length > 0)
  .map((l) => l.split(""))

const transposedGrid = transpose(grid)

const operations = transposedGrid
  .map((l) => l[l.length - 1])
  .filter((i) => i != " ")

const numbers = transposedGrid
  .map((l) => l.slice(0, l.length - 1).join("").trim())
  .join(",")
  .split(",,")
  .map((l) => l.split(",").map(Number))

console.log(numbers)
console.log(operations)

const results = operations.map((operation, i) =>
  operation === "+" ? sum(numbers[i]) : product(numbers[i])
)

console.log(results)
console.log(sum(results))
