const fs = require("fs");

const input = fs
  .readFileSync("day04/input.txt")
  .toString()
  .split("\n\n")
  .filter(i => i.length > 0);

class Card {
  constructor(string) {
    this.cardNumbers = string
      .split("\n")
      .map(i => i.split(" ")
        .filter(i => i.length > 0)
        .map(i => parseInt(i))
      ).flat();
    this.markers = new Array(25).fill(false);
    this.done = false;
  }

  freezeMarkers() {
    this.done = true;
  }

  markNumber(number) {
    if (this.done) {
      return;
    }
    const cardIndex = this.cardNumbers.indexOf(number);
    if (cardIndex > -1) {
      this.markers[cardIndex] = true;
    }
  }

  getUnmarkedSum() {
    return this.cardNumbers.reduce((acc, curr, i) => {
      if (!this.markers[i]) {
        acc += curr;
      }
      return acc;
    }, 0);
  }

  checkIndicesForMarkers(indices) {
    for (let i of indices) {
      if (!this.markers[i]) {
        return false;
      }
    }
    return true;
  }

  isWinning() {
    const template = [0, 1, 2, 3, 4]; 
    return (
    // Check rows
    this.checkIndicesForMarkers(template)
    || this.checkIndicesForMarkers(template.map(i => i + 5))
    || this.checkIndicesForMarkers(template.map(i => i + 10))
    || this.checkIndicesForMarkers(template.map(i => i + 15))
    || this.checkIndicesForMarkers(template.map(i => i + 20))

    // Check columns
    || this.checkIndicesForMarkers(template.map(i => i * 5))
    || this.checkIndicesForMarkers(template.map(i => i * 5 + 1))
    || this.checkIndicesForMarkers(template.map(i => i * 5 + 2))
    || this.checkIndicesForMarkers(template.map(i => i * 5 + 3))
    || this.checkIndicesForMarkers(template.map(i => i * 5 + 4))
    )
  }

}

let calledNumbers = input[0].split(",").map(i => parseInt(i));
console.log(calledNumbers);
let cards = [];
for (let i = 1; i < input.length; i++) {
  cards.push(new Card(input[i]));
}

for (const number of calledNumbers) {
  console.log(number);
  for (let card of cards) {
    if (card.isWinning()) {
      continue;
    }
    card.markNumber(number);
    if (card.isWinning()) {
      console.log("WINNER");
      console.log(card);
      console.log(card.getUnmarkedSum(), number);
      console.log(card.getUnmarkedSum() * number);
      card.freezeMarkers();
    }
  }
}