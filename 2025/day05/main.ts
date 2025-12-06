import { sum } from "lodash-es"

const [_, file = "input"] = Deno.args
const data = await Deno.readTextFile(`day05/${file}.txt`) satisfies string

const [rangesRaw, ingredientsRaw] = data.split("\n\n")

const ranges = rangesRaw.split("\n").map((range) =>
  range.split("-").map(Number)
)

const ingredients = ingredientsRaw.split("\n").filter((l) => l.length > 0).map(
  Number,
)

console.log(ranges, "|", ingredients)

let freshCounter = 0

for (const ingredient of ingredients) {
  for (const range of ranges) {
    if (range[0] <= ingredient && ingredient <= range[1]) {
      freshCounter++
      break
    }
  }
}

console.log(freshCounter)

ranges.sort((rangeA, rangeB) => rangeA[0] - rangeB[0])

const mergedRanges = []
let currentRange = ranges[0]

for (let i = 1; i < ranges.length; i++) {
  console.log(i, currentRange, ranges[i], "||", mergedRanges)
  if (ranges[i][0] <= currentRange[1]) {
    currentRange[1] = Math.max(currentRange[1], ranges[i][1])
  } else {
    mergedRanges.push(currentRange)
    currentRange = ranges[i]
  }
}

mergedRanges.push(currentRange)

console.log(sum(mergedRanges.map((range) => range[1] - range[0] + 1)))
