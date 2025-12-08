type Point = [number, number, number]

function getDistance(pointA: Point, pointB: Point): number {
  return Math.hypot(
    pointA[0] - pointB[0],
    pointA[1] - pointB[1],
    pointA[2] - pointB[2],
  )
}

const [_, file = "input"] = Deno.args
const data = await Deno.readTextFile(`day08/${file}.txt`) satisfies string

const points = data
  .split("\n")
  .filter((l) => l.length > 0)
  .map((l) => l.split(",").map(Number)) as Point[]

const distances: [number, number, number][] = []
for (let i = 0; i < points.length - 1; i++) {
  for (let j = i + 1; j < points.length; j++) {
    distances.push([getDistance(points[i], points[j]), i, j])
  }
}

distances.sort((a, b) => a[0] - b[0])

console.log(distances.slice(0, 10))

let circuits: Point[][] = points.map((point) => [point])

function findCircuit(point: Point, circuits: Point[][]): number {
  for (let i = 0; i < circuits.length; i++) {
    if (circuits[i].includes(point)) {
      return i
    }
  }

  return -1
}

for (let i = 0; i < distances.length; i++) {
  const [_, indexA, indexB] = distances[i]

  const circuitA = findCircuit(points[indexA], circuits)
  const circuitB = findCircuit(points[indexB], circuits)

  if (circuitA !== circuitB) {
    circuits.push([...circuits[circuitA], ...circuits[circuitB]])
    circuits = circuits.filter((_: Point[], i: number) =>
      i !== circuitA && i !== circuitB
    )
  }

  if (circuits.length === 1) {
    console.log(points[indexA], points[indexB])
    break
  }
}

console.log(
  circuits.map((circuit: Point[]) => circuit.length).sort((a, b) => b - a),
)
