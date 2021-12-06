const fs = require("fs");

const input = fs
  .readFileSync("day05/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

const size = 1000;
let field = new Array(size).fill(0).map(() => new Array(size).fill(0));

for (let i = 0; i < input.length; i++) {
    const endpoints = input[i]
        .split(" -> ").map(i => 
            new Point(...i.split(",").map(i => parseInt(i)))
        );
    console.log(endpoints);

    let current = endpoints[0];
    field[current.x][current.y] += 1;
    while (! current.equals(endpoints[1])) {
        if (current.x < endpoints[1].x) {
            current.x += 1;
        } else if (current.x > endpoints[1].x) {
            current.x -= 1;
        }

        if (current.y < endpoints[1].y) {  
            current.y += 1;
        } else if (current.y > endpoints[1].y) {
            current.y -= 1;
        }
        field[current.x][current.y] += 1;
    }

}

// console.log(field);
console.log(field.flat().filter(i => i > 1).length);