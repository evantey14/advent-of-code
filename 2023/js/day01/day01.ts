import fs from "fs"

const NUMBERS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const

const input = fs.readFileSync("./day01/example.txt", "utf8")
console.log(input)

const lines = input.split("\n").filter(line => line.length > 0)

console.log(lines)

const numbers = lines
  .map(line => {
    for (const char of line) {
      console.log(char)
    }
    return line
  })
  .map(line => parseInt(`${line[0]}${line[line.length - 1]}`, 10))

console.log(numbers)

const sum = numbers.reduce((acc, cur) => acc + cur, 0)
console.log(sum)
