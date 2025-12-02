import { chunk, every, sum } from "lodash-es";

const data = await Deno.readTextFile("input.txt") satisfies string;

const ranges = data.split(",").map((s) =>
  s.trim().split("-").map((i) => parseInt(i))
);

console.log(ranges);

function isValidId(i: number): boolean {
  const candidate = i.toString();

  for (let chunkSize = 1; chunkSize <= candidate.length / 2; chunkSize++) {
    if (candidate.length % chunkSize !== 0) {
      continue;
    }

    const chunks = chunk(candidate.split(""), chunkSize).map((c) => c.join(""));

    if (every(chunks, (item) => item === chunks[0])) {
      return true;
    }
  }

  return false;
}

const validIds = [];

ranges.forEach(([start, end]) => {
  for (let i = start; i <= end; i++) {
    if (isValidId(i)) {
      validIds.push(i);
    }
  }
});

console.log(sum(validIds));
