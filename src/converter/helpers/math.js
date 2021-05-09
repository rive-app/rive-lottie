const _radsToDegs =  180 / Math.PI;

const radsToDegs = value => value * _radsToDegs;
const toHundred = value => {
    if (Array.isArray(value)) {
        return value.map(value => value * 100);
    }
    return value * 100;
};
const identity = value => value;

module.exports = {
    radsToDegs,
    toHundred,
    identity,
}