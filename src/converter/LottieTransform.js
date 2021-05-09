const LottieArrayProperty = require("./properties/LottieArrayProperty");
const LottieNumberProperty = require("./properties/LottieNumberProperty");

class LottieTransform {

    _hasPositionSeparate = true;
    _opacity = new LottieNumberProperty(100);
    _x = new LottieNumberProperty(0);
    _y = new LottieNumberProperty(0);
    _scale = new LottieArrayProperty([100, 100]);
    _rotation = new LottieNumberProperty(0);

    set hasPositionSeparate(value) {
        this._hasPositionSeparate = value;
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
            }
        } else {
            return {
                s: false,
                k: [
                    this.x.serialize().k,
                    this.y.serialize().k,
                ]
            }
        }
    }

    serialize() {
        return {
            s: this.scale.serialize(),
            o: this.opacity.serialize(),
            p:  this.serializePosition(),
            r: this.rotation.serialize(),
        }
    }
}

module.exports = LottieTransform;