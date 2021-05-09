const LottieProperty = require("./LottieProperty");

class LottieNumberProperty extends LottieProperty {
    
    constructor(value = 0) {
        super();
        this.value = value;
    }

    addKeyframe(value, ...args) {
        super.addKeyframe([value], ...args);
    }

    set value(value) {
        super.value = [value];
    }

    validate(value) {
        return Array.isArray(value) && !isNaN(value[0]);
    }

    serialize() {
        if (this._value !== null) {
            return {
                'a': 0,
                'k': this._value[0],
            }
        } else {
            return super.serialize();
        }
    }
}

module.exports = LottieNumberProperty;