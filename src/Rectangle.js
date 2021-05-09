const ParametricPath = require('./ParametricPath');

class Rectangle extends ParametricPath {

    get cornerRadius() {
        return this._cornerRadius;
    }

    _initializeValues() {
        super._initializeValues();
        this._cornerRadius = 0;
    }

    _setCornerRadius(reader) {
        this._cornerRadius = reader.readFloat32();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[31] = this._setCornerRadius.bind(this);
    }

}

module.exports = Rectangle;