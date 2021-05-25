const LottieShapeContent = require('./LottieShapeContent');
const LottieNumberProperty = require('./properties/LottieNumberProperty');

class LottieShapeTrimPath extends LottieShapeContent {
  constructor() {
    super();
    this._start = new LottieNumberProperty(0);
    this._end = new LottieNumberProperty(100);
    this._offset = new LottieNumberProperty(0);
    this._trimMultipleShapes = 2;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get offset() {
    return this._offset;
  }

  set trimMultipleShapes(val) {
    this._trimMultipleShapes = val;
  }

  serialize() {
    return {
      ty: 'tm',
      s: this._start.serialize(),
      e: this._end.serialize(),
      o: this._offset.serialize(),
      m: this._trimMultipleShapes, // 1: Simultaneous, 2: Inividual
    };
  }
}

module.exports = LottieShapeTrimPath;
