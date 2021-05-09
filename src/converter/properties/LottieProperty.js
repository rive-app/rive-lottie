class LottieProperty {
    _keyframes = null;
    _value = null;

    get value() {
        return this._value;
    }

    get keyframes() {
        return this._keyframes;
    }

    get animated() {
        return this._keyframes !== null;
    }

    validate(value) {
        return true;
    }

    addKeyframe(value, time, easing) {
        if (this.validate(value)) {
            this._keyframes = this._keyframes || {};
            this._keyframes[time] = {
                value,
                time,
                easing,
            };
            this._value = null;
        } else {
            console.trace('INVALID VALUE', value);
        }
    }

    set value(value) {
        if (this.validate(value)) {
            this._keyframes = null;
            this._value = value;
        } else {
            console.trace('INVALID VALUE', value);
        }
    }

    _serializeKeyframes() {
        return Object.values(this._keyframes)
        .sort((a, b) => a.time - b.time)
        .map(keyframe => {
            return {
                s: keyframe.value,
                t: keyframe.time,
                ...keyframe.easing,
            }
        })
    }

    serialize() {
        if (this._value !== null) {
            return {
                'a': 0,
                'k': this._value,
            }
        } else if (Object.keys(this._keyframes).length === 1) {
            const time = Object.keys(this._keyframes)[0]
            return {
                'a': 0,
                'k': this._keyframes[time].value,
            }
        } else {
            return {
                a: 1,
                k: this._serializeKeyframes(),
            }
        }
    }
}

module.exports = LottieProperty;