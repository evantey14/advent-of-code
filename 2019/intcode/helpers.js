const getParamModes = function (instruction) {
  return Math.floor(instruction / 100)
    .toString()
    .padStart(3, "0")
    .split("")
    .reverse()
    .map(s => parseInt(s));
};

module.exports = { getParamModes };
