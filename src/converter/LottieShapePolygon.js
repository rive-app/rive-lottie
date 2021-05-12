const LottieShapeContent = require('./LottieShapeContent');
const LottieArrayProperty = require('./properties/LottieArrayProperty');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const LottieShapeSize = require('./properties/LottieShapeSize');

class LottieShapePolygon extends LottieShapeContent {
  constructor() {
    super();
    this._position = new LottieArrayProperty();
    this._size = new LottieShapeSize();
    this._points = new LottieNumberProperty();
    this._roundness = new LottieNumberProperty();
  }

  get position() {
    return this._position;
  }

  get size() {
    return this._size;
  }

  get roundness() {
    return this._roundness;
  }

  get points() {
    return this._points;
  }

  serialize() {
    const size = this._size.serialize();
    return {
      ty: 'sr',
      p: this._position.serialize(),
      or: {
        a: 0,
        k: size.k[0] * 0.5,
      },
      r: {
        a: 0,
        k: 0,
      },
      sy: 2,
      d: 1,
      pt: this._points.serialize(),
      os: this._roundness.serialize(),
    };
  }
}

module.exports = LottieShapePolygon;
