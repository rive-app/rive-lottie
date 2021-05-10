const ShapePaint = require('./ShapePaint');

class Fill extends ShapePaint {

    _initializeValues() {
        super._initializeValues();
        this._fillRule = 0;
    }

    _setFillRule(reader) {
        this._fillRule = reader.readVarUint();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[40] = this._setFillRule.bind(this);
    }
}

module.exports = Fill;