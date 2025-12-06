const [_, file = "input"] = Deno.args
const data = await Deno.readTextFile(`day01/${file}.txt`) satisfies string

const lines = data.split("\n").filter((l) => l.length > 0)
console.log(lines)

const NUM_POSITIONS = 100
let position = 50
let counter = 0

lines.forEach((line, i) => {
  let counterDelta = 0

  const direction = line.substring(0, 1)
  const amount = parseInt(line.substring(1))

  const newPosition = position + (direction === "R" ? 1 : -1) * amount

  const oldRotation = Math.floor(position / NUM_POSITIONS)
  const newRotation = Math.floor(newPosition / NUM_POSITIONS)

  if (position % NUM_POSITIONS === 0) {
    counterDelta = Math.floor(amount / NUM_POSITIONS)
  } else if (newPosition % NUM_POSITIONS === 0) {
    counterDelta = Math.floor(amount / NUM_POSITIONS) + 1
  } else if (oldRotation !== newRotation) {
    counterDelta = Math.abs(oldRotation - newRotation)
  }

  console.log(
    i,
    counter,
    counterDelta,
    "|",
    position,
    oldRotation,
    position % NUM_POSITIONS,
    "+",
    direction,
    amount,
    "->",
    newPosition,
    newRotation,
    newPosition % NUM_POSITIONS,
  )

  position = newPosition
  counter += counterDelta
})

console.log(counter)
