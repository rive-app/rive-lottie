const LottieShapeContent = require('./LottieShapeContent');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const LottieShapeSize = require('./properties/LottieShapeSize');
const LottieShapeGroup = require('./LottieShapeGroup');
const rangeFinder = require('./helpers/rangeFinder');
const flattenPaths = require('./flattener/flatten');

class LottieShapePolygon extends LottieShapeContent {
  constructor() {
    super();
    this._position = new LottieShapeSize();
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
      this._points.serialize(),
      this._roundness.serialize(),

    ], true);
    return flattenPaths(rangeTimes, id, riveData);
  }

  buildDefaultProps() {
    return {
      ty: 'sr',
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
  }

  serialize(riveData) {
    if (this._size.animated
      && !this._position.animated
      && (this._position.x.value !== 0.5
          || this._position.y.value !== 0.5)
    ) {
      return this.flattenShape(riveData);
    }
    // TODO: flattening could be prevented if position x and y match on keyframes
    if (this._position.animated) {
      return this.flattenShape(riveData);
    }
    let rootObject;
    const star = {
      ty: 'sr',
      p: this.calculatePosition(),
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
    if (size.k[0] !== size.k[1]) {
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

  _serialize() {
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
