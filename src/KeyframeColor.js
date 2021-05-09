const Keyframe = require('./Keyframe');
const {uin32ToRgba} = require('./helpers/color');

class KeyframeColor extends Keyframe {

    _initializeValues() {
        super._initializeValues();
        this._value = 0;
    }

    get value() {
        return this._value;
    }

    _setValue(reader) {
        const color = reader.readUint32();
        this._value = uin32ToRgba(color);
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[88] = this._setValue.bind(this);
    }
}

module.exports = KeyframeColor;
