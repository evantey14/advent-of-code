const fs = require("fs");

const input = fs
  .readFileSync("day12/input.txt")
  .toString()
  .split("\n")

console.log(input);

let graph = {};

// Build graph
input.forEach(edge => {
    const [first, second] = edge.split("-");
    console.log(first, second);
    if (!(first in graph)) {
        graph[first] = [];
    }
    graph[first].push(second);

    if (!(second in graph)) {
        graph[second] = [];
    }
    graph[second].push(first);
})

console.log(graph);

function isUpperCase(str) {
    return str.toUpperCase() === str;
}

function visitsTooManySmallCaves(visited) {
    let counts = {};
    visited.forEach(cave => {
        if (isUpperCase(cave)) return;
        if (!(cave in counts)) {
            counts[cave] = 0;
        }
        counts[cave]++;
    });
    if (Object.values(counts).filter(count => count > 2).length > 0) {
        return true;
    }
    return Object.values(counts).filter(count => count === 2).length > 1;
}

function findPaths(start, end, visited = []) {
    if (start === end) {
        return [visited];
    }
    let allPaths = [];
    for (let neighbor of graph[start]) {
        if (neighbor === "start") continue;
        if (isUpperCase(neighbor)
            || !visitsTooManySmallCaves([...visited, neighbor])) {
            const paths = findPaths(neighbor, end, [...visited, neighbor]);
            allPaths.push(...paths);
        }
    }
    return allPaths;
}

console.log(findPaths("start", "end", ["start"]));
console.log(findPaths("start", "end", ["start"]).length);

