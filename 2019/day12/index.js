const fs = require("fs");

const input = fs
  .readFileSync("day12/input.txt") // these were edited to make parsing easier
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const getDeltaV = function (pos1, pos2) {
  return Math.sign(pos2 - pos1);
};

class Moon {
  constructor(position) {
    this.position = position;
    this.velocity = [0, 0, 0];
  }
  updateVelocity(moon) {
    const deltas = this.position.map(function (pos, i) {
      return getDeltaV(pos, moon.position[i]);
    });
    this.velocity = this.velocity.map((v, i) => v + deltas[i]);
  }
  updatePosition() {
    this.position = this.position.map((pos, i) => pos + this.velocity[i]);
  }
  getEnergy() {
    const ePot = this.position.reduce((a, p) => a + Math.abs(p), 0);
    const eKin = this.velocity.reduce((a, v) => a + Math.abs(v), 0);
    return ePot * eKin;
  }
}

const moons = input.map(line => {
  return new Moon(line.split(",").map(s => parseInt(s)));
});

const updateVelocities = function (moons) {
  for (let moon of moons) {
    moons.forEach(function (otherMoon) {
      moon.updateVelocity(otherMoon);
    });
  }
};

const updatePositions = function (moons) {
  moons.forEach(function (m) {
    m.updatePosition();
  });
};

const getEnergy = function (moons) {
  return moons.map(m => m.getEnergy()).reduce((a, b) => a + b);
};

const getStates = function (moons) {
  let states = [];
  for (let i = 0; i < 3; i++) {
    const state = moons.reduce((str, moon) => {
      return str + moon.position[i] + "," + moon.velocity[i] + "|";
    }, "");
    states.push(state);
  }
  return states;
};

console.log(moons);

let xSet = new Set();
let ySet = new Set();
let zSet = new Set();

for (let i = 1; i <= 500000; i++) {
  updateVelocities(moons);
  updatePositions(moons);
  const [x, y, z] = getStates(moons);
  xSet.add(x);
  ySet.add(y);
  zSet.add(z);
}

console.log(getEnergy(moons));
console.log(xSet.size, ySet.size, zSet.size);
console.log("^got the LCM with wolframalpha");
