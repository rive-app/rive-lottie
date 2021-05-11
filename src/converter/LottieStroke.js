const LottieShapeContent = require('./LottieShapeContent');
const LottieColorProperty = require('./properties/LottieColorProperty');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const { rgbaToVector } = require('../helpers/color');

class LottieStroke extends LottieShapeContent {
  constructor() {
    super();
    this._fillRule = 0;
    this._id = -1;
    this._lineCap = 0;
    this._lineJoin = 1;
    this._colorId = -1;
    this._color = new LottieColorProperty();
    this._opacity = new LottieNumberProperty(1);
    this._strokeWidth = new LottieNumberProperty(0);
  }

  get color() {
    return this._color;
  }

  set lineCap(val) {
    this._lineCap = val;
  }

  set lineJoin(val) {
    this._lineJoin = val;
  }

  get opacity() {
    return this._opacity;
  }

  get strokeWidth() {
    return this._strokeWidth;
  }

  set colorId(val) {
    this._colorId = val;
  }

  getColorById(id) {
    return this._colorId === id ? this : null;
  }

  getShapeById(id) {
    return super.getShapeById(id) || this.getColorById(id);
  }

  serialize() {
    const serializedColor = this.color.serialize();
    // TODO: inprove this to identify if color is animated separate from opacity
    const color = {
      a: serializedColor.a,
    };
    const opacity = {
      a: serializedColor.a,
    };
    if (serializedColor.a === 1) {
      color.k = [];
      opacity.k = [];
      serializedColor.k.forEach((keyframe) => {
        const vectorColor = rgbaToVector(keyframe.s);
        color.k.push({
          i: keyframe.i,
          o: keyframe.o,
          s: [vectorColor[0], vectorColor[1], vectorColor[2], 1],
          t: keyframe.t,
        });
        opacity.k.push({
          i: keyframe.i,
          o: keyframe.o,
          s: [vectorColor[3]],
          t: keyframe.t,
        });
      });
    } else {
      color.k = [serializedColor.k[0], serializedColor.k[1], serializedColor.k[2], 1];
      // eslint-disable-next-line prefer-destructuring
      opacity.k = serializedColor.k[3];
    }

    return {
      ty: 'st',
      c: color,
      o: opacity,
      w: this.strokeWidth.serialize(),
      lc: this._lineCap, // TODO implement line cap
      lj: this._lineJoin, // TODO implement line join
      ml: 4, // TODO implement miter limit
      bm: 0, // TODO: blend mode implement,
      r: 0, // TODO: fill rule implement,
    };
  }
}

module.exports = LottieStroke;
