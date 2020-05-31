const fs = require("fs");
const { Robot } = require("./robot");

const input = fs
  .readFileSync("day11/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const program = input[0].split(",").map(s => parseInt(s));

let map = [];
for (let i = 0; i < 6; i++) {
  map[i] = [];
  for (let j = 0; j < 100; j++) {
    map[i][j] = ".";
  }
}

let robotPos = [0, 0];
map[robotPos[0]][robotPos[1]] = "#";

let robot = new Robot(program);
console.log(robot);

const getColor = (map, pos) => map[pos[0]][pos[1]];
const updatePos = (pos, step) => [pos[0] + step[0], pos[1] + step[1]];
const display = function (map, pos) {
  for (let i = 0; i < map.length; i++) {
    let str = "";
    for (let j = 0; j < map[i].length; j++) {
      str += pos[0] === i && pos[1] === j ? "O" : map[i][j];
    }
    console.log(str);
  }
};

let visited = new Set();
for (let i = 0; i < 50000; i++) {
  if (!robot.intcode.isRunning) {
    break;
  }
  visited.add(robotPos.reduce((a, b) => a + b, ""));
  const inputColor = getColor(map, robotPos);
  const outputColor = robot.processSquare(inputColor);
  console.log(robotPos, inputColor, "->", outputColor, robot.getStep());
  map[robotPos[0]][robotPos[1]] = outputColor;
  robotPos = updatePos(robotPos, robot.getStep());
  //display(map, robotPos);
}

console.log(Array.from(visited.keys()).sort()[visited.size - 1]);
console.log(robot.intcode.isRunning);
console.log(visited.size);

display(map, robotPos);
