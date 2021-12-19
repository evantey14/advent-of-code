const fs = require("fs");

const input = fs
  .readFileSync("day07/input.txt")
  .toString()
  .split("\n")[0]
  .split(",")
  .map(i => parseInt(i));

const sorted_list = input.sort((a, b) => a - b);

function getMedian(list) {
    const mid = Math.floor(list.length / 2);
    return list.length % 2 !== 0 ? list[mid] : (list[mid - 1] + list[mid]) / 2;
}

function getCOM(list) {
    console.log(list.reduce((a, b) => a + b) / list.length); 
    return Math.round(list.reduce((a, b) => a + b) / list.length); 
}

const median = getMedian(sorted_list);
console.log(median);
console.log(
    sorted_list.map(i => Math.abs(i - median)).reduce((a, b) => a + b)
);

const com = getCOM(sorted_list);
console.log(com);
console.log(
    sorted_list.map(i => Math.abs(i - com)).map(i => i * (i + 1) / 2).reduce((a, b) => a + b)
)
console.log(
    sorted_list.map(i => Math.abs(i - com + 1)).map(i => i * (i + 1) / 2).reduce((a, b) => a + b)
)