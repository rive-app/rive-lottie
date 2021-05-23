const LottieShapeContent = require('./LottieShapeContent');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const LottieShapeSize = require('./properties/LottieShapeSize');
const LottieShapeGroup = require('./LottieShapeGroup');
const rangeFinder = require('./helpers/rangeFinder');
const flattenPaths = require('./flattener/flatten');

const types = {
  STAR: 'star',
  POLYGON: 'polygon',
};

class LottieShapePolygon extends LottieShapeContent {
  constructor() {
    super();
    this._position = new LottieShapeSize();
    this._size = new LottieShapeSize();
    this._points = new LottieNumberProperty();
    this._roundness = new LottieNumberProperty();
    this._innerRadius = new LottieNumberProperty();

    this._polygonType = types.POLYGON;
  }

  set polygonType(val) {
    if (Object.values(types).includes(val)) {
      this._polygonType = val;
    }
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

  get innerRadius() {
    return this._innerRadius;
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
      this.innerRadius.serialize(),

    ], true);
    return flattenPaths(rangeTimes, id, riveData);
  }

  completeInnerRadius() {
    if (this._polygonType === types.STAR) {
      const innerRadius = this._innerRadius.serialize();
      let innerRadiusData;
      if (this._innerRadius.animated) {
        innerRadiusData = {
          a: 1,
          k: innerRadius.k.map((keyframe) => (
            {
              ...keyframe,
              s: [this._size.x.value[0] * [keyframe.s[0]] * 0.5],
            }
          )),
        };
      } else {
        innerRadiusData = {
          a: 0,
          k: this._size.x.value[0] * innerRadius.k * 0.5,
        };
      }
      return {
        ir: innerRadiusData,
        is: {
          a: 0,
          k: 0,
        },
      };
    }
    return null;
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
    // Since the Inner Radius of a STAR is percentage based, the shape needs to be flattened
    if (this._polygonType === types.STAR) {
      if (this._size.animated) {
        return this.flattenShape(riveData);
      }
      if (this._size.x.value[0] !== this._size.y.value[0]) {
        return this.flattenShape(riveData);
      }
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
      sy: this._polygonType === types.POLYGON ? 2 : 1,
      d: 1,
      pt: this._points.serialize(),
      os: this._roundness.serialize(),
      ...this.completeInnerRadius(),
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
      lottieShapeGroup.transform.x.value = 0;
      lottieShapeGroup.transform.y.value = 0;
      // TODO: it looks like these values are wrong. Keeping them for now just in case.
      // lottieShapeGroup.transform.x.value = -size.k[0] * 0.5 * 0.5;
      // lottieShapeGroup.transform.y.value = -size.k[1] * 0.5 * 0.5;
      const serializedGroup = lottieShapeGroup.serialize();
      serializedGroup.it.unshift(star);
      rootObject = serializedGroup;
    } else {
      star.or = {
        a: 0,
        k: size.k[0] * 0.5,
      };
      rootObject = star;
    }
    return rootObject;
  }
}

LottieShapePolygon.polygonTypes = types;

module.exports = LottieShapePolygon;
