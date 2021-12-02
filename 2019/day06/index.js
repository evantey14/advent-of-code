const fs = require("fs");

const input = fs
  .readFileSync("day06/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

//console.log(input);

class DAG {
  constructor() {
    this.vertices = new Map();
  }
  getVertex(v) {
    if (!this.vertices.has(v)) {
      this.vertices.set(v, new Vertex(v));
    }
    return this.vertices.get(v);
  }
}

class Vertex {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.par = null;
  }
  addChild(v) {
    this.children.push(v);
  }
  addParent(p) {
    this.par = p;
  }
}

const createGraph = function (input) {
  let dag = new DAG();
  for (let i = 0; i < input.length; i++) {
    const [p, c] = input[i].split(")").map(v => dag.getVertex(v));
    p.addChild(c);
    c.addParent(p);
  }
  return dag;
};

let dag = createGraph(input);
//console.log(dag, dag.vertices.size);

const com = dag.getVertex("COM");
const countOrbits = function (root, depth) {
  let orbits = 0;
  for (let child of root.children) {
    orbits += countOrbits(child, depth + 1) + depth;
  }
  return orbits;
};

console.log(countOrbits(com, 1));

const getDistance = function (start, stop) {
  let visited = new Set([start]);
  let queue = [[start, 0]];
  while (queue.length > 0) {
    let [v, distance] = queue.shift();
    if (v.name === stop.name) {
      return distance;
    } else {
      const neighbors = [v.par, ...v.children];
      for (let n of neighbors) {
        if (n && !visited.has(n)) {
          visited.add(n);
          queue.push([n, distance + 1]);
        }
      }
    }
  }
};

const you = dag.getVertex("YOU");
const santa = dag.getVertex("SAN");
console.log(getDistance(you.par, santa.par));
