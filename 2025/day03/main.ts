import { indexOf, max, sum } from "lodash-es";

const [_, file = "input"] = Deno.args;
const data = await Deno.readTextFile(`day03/${file}.txt`) satisfies string;

const banks = data.split("\n").filter((l) => l.length > 0).map((bank) =>
  bank.split("").map((i) => parseInt(i))
);

const BATTERIES_TO_TURN_ON = 12;

function argMax(batteries: number[]): number {
  const maxValue = max(batteries);
  return indexOf(batteries, maxValue);
}

function getHighestJoltage(bank: number[]): number {
  const batteryIndices = [
    argMax(bank.slice(0, bank.length - BATTERIES_TO_TURN_ON + 1)),
  ];

  for (
    let digitsLeft = BATTERIES_TO_TURN_ON - 1;
    digitsLeft > 0;
    digitsLeft--
  ) {
    const startingIndex = batteryIndices[batteryIndices.length - 1] + 1;

    batteryIndices.push(
      argMax(bank.slice(startingIndex, bank.length - digitsLeft + 1)) +
        startingIndex,
    );
  }

  return Number(batteryIndices.map((i) => bank[i]).join(""));
}

const joltages = banks.map(getHighestJoltage);

console.log(sum(joltages));
