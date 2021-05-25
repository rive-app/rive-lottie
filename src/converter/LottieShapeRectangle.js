const LottieShapeContent = require('./LottieShapeContent');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const LottieShapeSize = require('./properties/LottieShapeSize');
const rangeFinder = require('./helpers/rangeFinder');
const flattenPaths = require('./flattener/flatten');

class LottieShapeRectangle extends LottieShapeContent {
  constructor() {
    super();
    this._position = new LottieShapeSize();
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

  calculatePosition() {
    const size = this._size.serialize();
    const position = this._position.serialize();
    let finalPos;
    if (position.a) {
      finalPos = {
        a: 1,
        k: position.k.map((keyframe) => ({
          ...keyframe,
          s: [
            size.k[0] * -(keyframe.s[0] - 0.5),
            size.k[1] * -(keyframe.s[1] - 0.5),
          ],
        }
        )),
      };
    } else {
      finalPos = {
        a: 0,
        k: [
          size.k[0] * -(position.k[0] - 0.5),
          size.k[1] * -(position.k[1] - 0.5),
        ],
      };
    }
    return finalPos;
  }

  flattenShape(riveData) {
    // TODO: find a way to solve dual id value between parent and child
    const { id } = this.parent;
    const rangeTimes = rangeFinder([
      this.size.x.serialize(),
      this.size.y.serialize(),
      this.position.x.serialize(),
      this.position.y.serialize(),
    ], true);
    return flattenPaths(rangeTimes, id, riveData);
  }

  serialize(riveData) {
    if (this._size.animated) {
      if (!this._position.animated
        && this._position.x.value === 0.5
        && this._position.y.value === 0.5) {
        return {
          ty: 'rc',
          p: { a: 0, k: [0, 0] },
          s: this._size.serialize(),
          r: this._roundness.serialize(),
        };
      }
      return this.flattenShape(riveData);
    }
    // TODO: flattening could be prevented if position x and y match on keyframes
    if (this._position.animated) {
      return this.flattenShape(riveData);
    }
    return {
      ty: 'rc',
      p: this.calculatePosition(),
      s: this._size.serialize(),
      r: this._roundness.serialize(),
      d: 2,
    };
  }
}

module.exports = LottieShapeRectangle;
