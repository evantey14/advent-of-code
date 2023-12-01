const fs = require("fs");

const input = fs
  .readFileSync("day18/input.txt")
  .toString()
  .split("\n")

class SnailFishNumber {
  constructor(s) {
    this.numbers = s.replace(/\W/g, '').split("").map(i => parseInt(i));
    this.opens = [];
    this.closes = [];
    let o = 0;
    let c = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "[") o++;
      if (s[i] === "]") c++;
      if ("0123456789".includes(s[i])) {
        this.opens.push(o);
        this.closes.push(c);
        o = 0;
        c = 0;
      }
    }
    this.opens.push(o);
    this.closes.push(c);
  }

  getDepths() {
    let depths = [this.opens[0] - this.closes[0]];
    for (let i = 1; i < this.numbers.length; i++) {
      depths.push(this.opens[i] - this.closes[i] + depths[i-1]);
    }
    return depths;
  }

  merge(s) {
    this.numbers.push(...s.numbers);
    this.opens[0]++;

    this.opens[this.opens.length - 1] += s.opens[0];
    this.closes[this.closes.length - 1] += s.closes[0];

    this.opens.push(...s.opens.slice(1));
    this.closes.push(...s.closes.slice(1));

    this.closes[this.closes.length - 1]++;
  }

  findNextIndex() {
    const depths = this.getDepths();
    for (let i = 0; i < depths.length - 1; i++) {
      if (depths[i] === depths[i+1] && depths[i] > 4) {
        return i;
      }
    }
    return this.numbers.findIndex(n => n > 9);
  }

  reduce() {
    while (this.findNextIndex() !== -1) {
      let i = this.findNextIndex();
      const depths = this.getDepths();
      if (depths[i] > 4 && depths[i+1] > 4) {
        // console.log(`EXPLODING ${i} (${this.numbers[i]}, ${this.numbers[i+1]}) ->`, this);
        this.explode(i);
      } else {
        // console.log(`SPLITTING ${i} (${this.numbers[i]}) ->`, this.numbers);
        this.split(i);
      }
    }
    // console.log("DONE", this);
  }

  explode(i) {
    if (i > 0) {
      this.numbers[i-1] += this.numbers[i];
    }
    if (i + 1 < this.numbers.length - 1) {
      this.numbers[i+2] += this.numbers[i+1];
    }
    this.numbers.splice(i, 2, 0);
    this.opens[i]--;
    this.opens.splice(i+1, 1)

    this.closes[i+2]--;
    this.closes.splice(i+1, 1)
  }

  split(i) {
    const n = this.numbers[i];
    this.numbers.splice(i, 1, Math.floor(n / 2), Math.ceil(n / 2));

    this.opens[i]++;
    this.opens.splice(i+1, 0, 0);

    this.closes.splice(i+1, 0, 0);
    this.closes[i+2]++;
  }

  toString() {
    let s = "[".repeat(this.opens[0]);
    for (let i = 0; i < this.numbers.length; i++) {
      s += this.numbers[i];
      s += "]".repeat(this.closes[i+1]);
      s += ",";
      s += "[".repeat(this.opens[i+1]);
    }
    return s.slice(0, -1);
  }
}
const snailFishNumbers = input.map(s => new SnailFishNumber(s));
// console.log(snailFishNumbers);

const finalNumber = snailFishNumbers.reduce((acc, s) => {
  acc.merge(s);
  acc.reduce();
  return acc;
});

console.log(finalNumber.toString());
const fn = eval(finalNumber.toString());
console.log(fn);

function calculateMag(a) {
  if (Array.isArray(a)) {
    return 3 * calculateMag(a[0]) + 2 * calculateMag(a[a.length - 1]); 
  } else {
    return a;
  }
}

console.log(calculateMag(fn));

let maxMag = 0;
for (let i = 0; i < snailFishNumbers.length; i++) {
  for (let j = 0; j < snailFishNumbers.length; j++) {
    // make fresh copies every time cause I didn't make merge smart
    if (i === j) continue;
    let fresh = input.map(s => new SnailFishNumber(s));
    fresh[i].merge(fresh[j]);
    fresh[i].reduce();
    let mag = calculateMag(eval(fresh[i].toString()));
    // console.log(`${i} + ${j} -> ${mag}`);
    if (mag > maxMag) {
      maxMag = mag;
      console.log(`${i} + ${j} -> ${mag}`);
    }
  }
}