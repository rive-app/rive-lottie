const LottieShapeContent = require('./LottieShapeContent');
const LottieArrayProperty = require('./properties/LottieArrayProperty');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const LottieShapeSize = require('./properties/LottieShapeSize');

class LottieShapeRectangle extends LottieShapeContent {
  constructor() {
    super();
    this._position = new LottieArrayProperty();
    this._size = new LottieShapeSize();
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

  serialize() {
    return {
      ty: 'rc',
      p: this._position.serialize(),
      s: this._size.serialize(),
      r: this._roundness.serialize(),
    };
  }
}

module.exports = LottieShapeRectangle;
