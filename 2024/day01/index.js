import fs from "fs"
import { sum } from "lodash-es"

const input = fs.readFileSync("./day01/input.txt", "utf8")
console.log(input)

const lines = input.split("\n").filter(line => line.length > 0)
console.log(lines)

const numbers = lines.map(line => line.split("  ").map(i => parseInt(i)))
console.log(numbers)

const firstColumn = numbers.map(line => line[0]).sort()
const secondColumn = numbers.map(line => line[1]).sort()

console.log(firstColumn)
console.log(secondColumn)

const differences = firstColumn.map((first, i) => Math.abs(secondColumn[i] - first))
console.log(sum(differences))


const similarityScores = firstColumn.map(first => {
    const counts = secondColumn.filter(i => i === first).length
    return first * counts
})
console.log(sum(similarityScores))
