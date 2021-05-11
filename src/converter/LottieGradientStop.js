const LottieShapeContent = require('./LottieShapeContent');
const LottieColorProperty = require('./properties/LottieColorProperty');
const LottieNumberProperty = require('./properties/LottieNumberProperty');

class LottieGradientStop extends LottieShapeContent {
  constructor() {
    super();
    this._color = new LottieColorProperty();
    this._position = new LottieNumberProperty(0);
  }

  get color() {
    return this._color;
  }

  get position() {
    return this._position;
  }

  serialize() {
    return {
      c: this._color.serialize(),
      p: this._position.serialize(),
    };
  }
}

module.exports = LottieGradientStop;
