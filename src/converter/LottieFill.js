const LottieShapeContent = require('./LottieShapeContent');
const LottieColorProperty = require('./properties/LottieColorProperty');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const { rgbaToVector } = require('../helpers/color');

class LottieFill extends LottieShapeContent {
  constructor() {
    super();
    this._fillRule = 0;
    this._id = -1;
    this._color = new LottieColorProperty();
    this._opacity = new LottieNumberProperty(1);
  }

  get color() {
    return this._color;
  }

  get opacity() {
    return this._opacity;
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
    // console.log('aaaa', serializedColor.a)
    return {
      ty: 'fl',
      c: color,
      o: opacity,
      bm: 0, // TODO: blend mode implement,
      r: 0, // TODO: fill rule implement,
    };
  }
}

module.exports = LottieFill;
