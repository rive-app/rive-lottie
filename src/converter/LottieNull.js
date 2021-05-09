const LottieLayer = require("./LottieLayer");

class LottieNull extends LottieLayer {

    serialize() {
        return {
            ty: 3,
            sr: 1,
            ...super.serialize(),
        }
    }
}

module.exports = LottieNull;