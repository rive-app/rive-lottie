const LottieShapeContent = require('./LottieShapeContent');
const LottieArrayProperty = require('./properties/LottieArrayProperty');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const LottieShapeSize = require('./properties/LottieShapeSize');
const LottieShapeGroup = require('./LottieShapeGroup');

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
    let rootObject;
    const star = {
      ty: 'sr',
      p: this._position.serialize(),
      or: {
        a: 0,
        k: 1,
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
    const size = this._size.serialize();
    if (size.a === 1) {
      // TODO: could skip flattening if size width and height have same keyframes
    } else if (size.k[0] !== size.k[1]) {
      star.or = {
        a: 0,
        k: 1,
      };
      const lottieShapeGroup = new LottieShapeGroup();
      lottieShapeGroup.transform.hasPositionSeparate = false;
      lottieShapeGroup.transform.scale.value = [size.k[0] * 0.5 * 100, size.k[1] * 0.5 * 100];
      lottieShapeGroup.transform.x.value = -size.k[0] * 0.5 * 0.5;
      lottieShapeGroup.transform.y.value = -size.k[1] * 0.5 * 0.5;
      const serializedGroup = lottieShapeGroup.serialize();
      serializedGroup.it.unshift(star);
      rootObject = serializedGroup;
    } else {
      star.or = {
        a: 0,
        k: size[0] * 0.5,
      };
      rootObject = star;
    }
    return rootObject;
  }
}

module.exports = LottieShapePolygon;
