const fs = require("fs");

const input = fs
  .readFileSync("day10/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const map = input.map(s => s.split(""));
const printMap = map => map.forEach(row => console.log(row.join("")));
printMap(map);

const getAsteroids = function (map) {
  let asteroids = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "#") {
        asteroids.push([j, i]);
      }
    }
  }
  return asteroids;
};
const getAngle = function (p1, p2) {
  const deltaX = p1[0] - p2[0];
  const deltaY = p2[1] - p1[1];
  const atan = Math.atan2(deltaX, deltaY);
  return atan >= 0 ? atan : 2 * Math.PI + atan;
};

const asteroids = getAsteroids(map);

let bestStation = undefined;
let bestCount = 0;
for (let i = 0; i < asteroids.length; i++) {
  const station = asteroids[i];
  let angles = new Set();
  for (let j = 0; j < asteroids.length; j++) {
    const angle = getAngle(asteroids[j], station);
    angles.add(angle);
  }
  if (angles.size > bestCount) {
    bestStation = station;
    bestCount = angles.size;
  }
}

console.log(bestStation, bestCount);

let asteroidMap = new Map();
for (let i = 0; i < asteroids.length; i++) {
  const angle = getAngle(asteroids[i], bestStation);
  if (asteroidMap.has(angle)) {
    asteroidMap.get(angle).push(asteroids[i]);
  } else {
    asteroidMap.set(angle, [asteroids[i]]);
  }
}

let angles = Array.from(asteroidMap.keys()).sort();
const getDist = (p1, p2) => Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
for (let angle of angles) {
  asteroidMap.get(angle).sort((a, b) => {
    const distA = getDist(a, bestStation);
    const distB = getDist(b, bestStation);
    return distA - distB;
  });
  console.log(angle, asteroidMap.get(angle));
}

asteroidMap.get(0).shift(); // remove station

let sortedAsteroids = [];
let index = 0;
while (sortedAsteroids.length < asteroids.length - 1) {
  const list = asteroidMap.get(angles[index % angles.length]);
  if (list.length > 0) {
    sortedAsteroids.push(list.shift());
  }
  index++;
}
console.log(sortedAsteroids[199]);
