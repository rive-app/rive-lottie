const LottieArrayProperty = require('./properties/LottieArrayProperty');
const LottieNumberProperty = require('./properties/LottieNumberProperty');

class LottieTransform {
  constructor() {
    this._hasPositionSeparate = true;
    this._opacity = new LottieNumberProperty(100);
    this._x = new LottieNumberProperty(0);
    this._y = new LottieNumberProperty(0);
    this._scale = new LottieArrayProperty([100, 100]);
    this._rotation = new LottieNumberProperty(0);
  }

  set hasPositionSeparate(value) {
    this._hasPositionSeparate = value;
  }

  get hasPositionSeparate() {
    return this._hasPositionSeparate;
  }

  get opacity() {
    return this._opacity;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get scale() {
    return this._scale;
  }

  get rotation() {
    return this._rotation;
  }

  serializePosition() {
    if (this._hasPositionSeparate) {
      return {
        s: true,
        x: this.x.serialize(),
        y: this.y.serialize(),
      };
    }
    return {
      s: false,
      k: [
        this.x.serialize().k,
        this.y.serialize().k,
      ],
    };
  }

  serialize() {
    return {
      s: this.scale.serialize(),
      o: this.opacity.serialize(),
      p: this.serializePosition(),
      r: this.rotation.serialize(),
    };
  }
}

module.exports = LottieTransform;
