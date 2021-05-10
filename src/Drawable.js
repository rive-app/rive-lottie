const Node = require('./Node');

class Drawable extends Node {

    _initializeValues() {
        super._initializeValues();
        this._blendModeValue = 3;
    }

    _setBlendModeValue(reader) {
        this._blendModeValue = reader.readVarUint();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[23] = this._setBlendModeValue.bind(this);
    }
}

module.exports = Drawable;