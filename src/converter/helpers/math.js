const _radsToDegs = 180 / Math.PI;

const radsToDegs = (value) => value * _radsToDegs;
const toHundred = (value) => {
  if (Array.isArray(value)) {
    return value.map((val) => val * 100);
  }
  return value * 100;
};
const identity = (value) => value;

const hundredToDegs = (value) => (value * 360) / 100;

const toDegs = (value) => (value * 360);

const round = (number, decimals = 3) => Math.round(number * 10 ** decimals) / (10 ** decimals);

module.exports = {
  radsToDegs,
  toHundred,
  identity,
  round,
  hundredToDegs,
  toDegs,
};
