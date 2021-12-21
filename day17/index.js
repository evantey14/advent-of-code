// const targetX = [20, 30]
// const targetY = [-10, -5]
const targetX = [57, 116]
const targetY = [-198, -148]

function evolve(x, y, vx, vy) {
    return [
        x + vx, 
        y + vy, 
        vx > 0 ? vx - 1 : 
        vx, vy - 1
    ]
}

function pastTrench(x, y) {
    return x > targetX[1] || y < targetY[0]
}

function inTrench(x, y) {
    return targetX[0] <= x && x <= targetX[1] && targetY[0] <= y && y <= targetY[1];
}

function getHighestPoint(vx, vy) {
    let state = [0, 0, vx, vy];
    let highest = 0;
    while (!pastTrench(state[0], state[1])) {
        // console.log(state);
        state = evolve(...state);
        highest = Math.max(highest, state[1]);
        if (inTrench(state[0], state[1])) {
            return highest;
        }
    }
    return -1;
}
// console.log(getHighestPoint(7, 2));
// console.log(getHighestPoint(6, 3));
// console.log(getHighestPoint(9, 0));
// console.log(getHighestPoint(17, -4));
console.log(getHighestPoint(25, -7));

let maxHighest = 0; 
let count = 0;
for (let vx = 1; vx <= 116; vx++) {
    for (let vy = -198; vy <= 500; vy++) {
        const highestPoint = getHighestPoint(vx, vy);
        if (highestPoint > -1) {
            // console.log(`vx: ${vx}, vy: ${vy}, highest: ${highestPoint}`);
            count++;
        }
        if (highestPoint > maxHighest) {
            // console.log(`${vx}, ${vy}, ${highestPoint}`);
            maxHighest = highestPoint;
        }
    }
}
console.log(count);