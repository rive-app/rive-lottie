const Component = require('./Component');
const bool = require('./helpers/boolean')

class ClippingShape extends Component {

    _setSourceId(reader) {
        this._sourceId = reader.readVarUint();
    }

    _setFillRule(reader) {
        this._fillRule = reader.readVarUint();
    }

    _setIsVisible(reader) {
        this._isVisible = bool(reader);
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[92] = this._setSourceId.bind(this);
        this._properties[93] = this._setFillRule.bind(this);
        this._properties[94] = this._setIsVisible.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._sourceId = -1;
        this._fillRule = 0;
        this._isVisible = true;
    }
}

module.exports = ClippingShape;