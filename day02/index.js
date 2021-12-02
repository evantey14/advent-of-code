const fs = require("fs");

const input = fs
  .readFileSync("day02/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

let x_position = 0;
let depth = 0;
let aim = 0

for (let i = 0; i < input.length; i++) {
  [command, distance_str] = input[i].split(" ");
  distance = parseInt(distance_str);
  if (command === "forward") {
    x_position += distance;
    depth += aim * distance;
  } else if (command === "up") {
    aim -= distance;
  } else if (command === "down") {
    aim += distance;
  }
}

console.log(depth * x_position);
