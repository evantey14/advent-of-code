const fs = require("fs");

const input = fs
  .readFileSync("day03/input.txt")
  .toString()
  .split("\n")
  .filter((i) => i.length > 0);

const getNextPoint = function (previousPoint, instruction) {
  const direction = instruction[0];
  const distance = parseInt(instruction.slice(1));

  let delta = [0, 0];
  switch (direction) {
    case "U":
      delta = [0, distance];
      break;
    case "D":
      delta = [0, -distance];
      break;
    case "L":
      delta = [-distance, 0];
      break;
    case "R":
      delta = [distance, 0];
      break;
  }
  return [previousPoint[0] + delta[0], previousPoint[1] + delta[1]];
};

const getLines = function (instructions) {
  let lines = [];
  let currentPoint = [0, 0];
  for (let i = 0; i < instructions.length; i++) {
    const nextPoint = getNextPoint(currentPoint, instructions[i]);
    lines.push(new Line(currentPoint, nextPoint));
    currentPoint = nextPoint;
  }
  return lines;
};

const getDistance = (start, end) =>
  Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]);

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.isHorizontal = start[1] === end[1];
    this.length = getDistance(start, end);
  }
  containsPoint(point) {
    if (this.isHorizontal) {
      const minX = Math.min(this.start[0], this.end[0]);
      const maxX = Math.max(this.start[0], this.end[0]);
      const y = this.start[1];
      return minX <= point[0] && point[0] <= maxX && y === point[1];
    } else {
      const x = this.start[0];
      const minY = Math.min(this.start[1], this.end[1]);
      const maxY = Math.max(this.start[1], this.end[1]);
      return x === point[0] && minY <= point[1] && point[1] <= maxY;
    }
  }
  getIntersection(line) {
    let proposal = [Infinity, Infinity];
    if (this.isHorizontal && !line.isHorizontal) {
      proposal = [line.start[0], this.start[1]];
    } else if (!this.isHorizontal && line.isHorizontal) {
      proposal = [this.start[0], line.start[1]];
    }
    return this.containsPoint(proposal) && line.containsPoint(proposal)
      ? proposal
      : null;
  }
}

const getIntersectionPoints = function (line1s, line2s) {
  let intersectionPoints = [];
  for (let i = 0; i < line1s.length; i++) {
    for (let j = 0; j < line2s.length; j++) {
      const intersectionPoint = line1s[i].getIntersection(line2s[j]);
      if (intersectionPoint) {
        intersectionPoints.push(intersectionPoint);
      }
    }
  }
  return intersectionPoints;
};

const getWireDist = function (point, wireLines) {
  let distance = 0;
  for (let line of wireLines) {
    if (line.containsPoint(point)) {
      distance += getDistance(line.start, point);
      break;
    } else {
      distance += line.length;
    }
  }
  return distance;
};

const getTotalWireDist = (p) =>
  getWireDist(p, wireOneLines) + getWireDist(p, wireTwoLines);

const wireOne = input[0].split(",");
const wireTwo = input[1].split(",");

const wireOneLines = getLines(wireOne);
const wireTwoLines = getLines(wireTwo);
const intersectionPoints = getIntersectionPoints(wireOneLines, wireTwoLines);

let closestPoint = [Infinity, Infinity];
for (let point of intersectionPoints) {
  if (getTotalWireDist(point) < getTotalWireDist(closestPoint)) {
    closestPoint = point;
  }
}
console.log(closestPoint, getTotalWireDist(closestPoint));
