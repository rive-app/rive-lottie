const Component = require('./Component');

class ClippingShape extends Component {

    _setSourceId(reader) {
        this._sourceId = reader.readUint8();
    }

    _setFillRule(reader) {
        this._fillRule = reader.readUint8();
    }

    _setIsVisible(reader) {
        this._isVisible = reader.readUint8() === 1;
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