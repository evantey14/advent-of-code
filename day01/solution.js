const fs = require('fs');

const input = fs.readFileSync('day01/input.txt')
                 .toString()
                 .split('\n')
                 .filter(i => i.length > 0);
const inputMasses = input.map(i => parseInt(i));

const getRequiredFuel = mass => Math.max(0, Math.floor(mass / 3) - 2);

let currentMasses = inputMasses.map(getRequiredFuel);
let totalFuelReq = 0;

while(currentMasses.some(m => m > 0)) {
  totalFuelReq += currentMasses.reduce((a, b) => a + b);
  currentMasses = currentMasses.map(getRequiredFuel);
}

console.log(totalFuelReq);
