const LottieLayer = require('./LottieLayer');

class LottieComposition extends LottieLayer {
  constructor(width = 0, height = 0) {
    this._width = width;
    this._height = height;
    this._children = [];
  }

  addLayer(child) {
    this._children.push(child);
  }

  serialize() {
    return {
      w: this._width,
      h: this._height,
      ...super.serialize(),
    };
  }
}

module.exports = LottieComposition;
