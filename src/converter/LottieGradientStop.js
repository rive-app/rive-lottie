const LottieShapeContent = require("./LottieShapeContent");
const LottieColorProperty = require("./properties/LottieColorProperty");
const LottieNumberProperty = require("./properties/LottieNumberProperty");

class LottieGradientStop extends LottieShapeContent{

    get color() {
        return this._color;
    }
    get position() {
        return this._position;
    }

    _color = new LottieColorProperty();
    _position = new LottieNumberProperty(0);

    serialize() {
        return {
            c: this._color.serialize(),
            p: this._position.serialize(),
        }
    }
}

module.exports = LottieGradientStop;