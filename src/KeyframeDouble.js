const Keyframe = require('./Keyframe');

class KeyframeDouble extends Keyframe {

    _initializeValues() {
        super._initializeValues();
        this._value = 0;
    }

    get value() {
        return this._value;
    }

    _setValue(reader) {
        this._value = reader.readFloat32();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[70] = this._setValue.bind(this);
    }
}

module.exports = KeyframeDouble;
