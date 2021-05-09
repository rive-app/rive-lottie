const LottieGradientFill = require("./LottieGradientFill");
const LottieNumberProperty = require("./properties/LottieNumberProperty");

class LottieGradientStroke extends LottieGradientFill {
    
    get strokeWidth() {
        return this._strokeWidth;
    }

    _strokeWidth = new LottieNumberProperty(0);

    serialize() {
        const serialized = super.serialize();
        const stroke = this._strokeWidth.serialize();
        return {
            ...serialized,
            ty: 'gs',
            w: stroke,
        }
    }
}

module.exports = LottieGradientStroke;
