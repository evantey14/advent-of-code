const fs = require("fs");

const input = fs
  .readFileSync("day08/input.txt")
  .toString()
  .split("\n")
  .filter(i => i.length > 0);

const chunkString = function (s, chunkSize) {
  let chunks = [];
  for (let i = 0; i < s.length; i += chunkSize) {
    chunks.push(s.slice(i, i + chunkSize));
  }
  return chunks;
};

const countChars = function (image, c) {
  return image.reduce((count, s) => (s === c ? count + 1 : count), 0);
};

const getVisibleMask = vis => vis.map(el => (el === 2 ? 0 : 1));
const getLayerMask = vis => vis.map(el => (el === 2 ? 1 : 0));
const add = (l1, l2) => l1.map((e, i) => e + l2[i]);
const mult = (l1, l2) => l1.map((e, i) => e * l2[i]);

const displayImage = function (image) {
  const layers = chunkString(image, 150);
  const visiblePixels = layers.reduce((v, l) => {
    const vis = mult(getVisibleMask(v), v);
    const delta = mult(getLayerMask(v), l);
    return add(vis, delta);
  }, new Array(150).fill(2));
  for (let i = 0; i < 6; i++) {
    let s = "";
    for (let j = 0; j < 25; j++) {
      s += visiblePixels[25 * i + j] === 1 ? "1" : " ";
    }
    console.log(s);
  }
};

const image = input[0].split("").map(s => parseInt(s));
//console.log(image.length);

const layers = chunkString(image, 150);
//console.log(layers);

const minLayer = layers.reduce((a, b) => (countChars(b, 0) < countChars(a, 0) ? b : a));

console.log(countChars(minLayer, 1) * countChars(minLayer, 2));

displayImage(image);
