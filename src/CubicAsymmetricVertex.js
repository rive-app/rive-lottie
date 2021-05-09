const CubicVertex = require('./CubicVertex');

class CubicAsymmetricVertex extends CubicVertex {

    _setRotation(reader) {
        this._rotation = reader.readFloat32();
    }

    _setInDistance(reader) {
        this._inDistance = reader.readFloat32();
    }

    _setOutDistance(reader) {
        this._outDistance = reader.readFloat32();
    }

    get rotation() {
        return this._rotation;
    }

    get inDistance() {
        return this._inDistance;
    }

    get outDistance() {
        return this._outDistance;
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[79] = this._setRotation.bind(this);
        this._properties[80] = this._setInDistance.bind(this);
        this._properties[81] = this._setOutDistance.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._rotation = 0;
        this._inDistance = 0;
        this._outDistance = 0;
    }
}

module.exports = CubicAsymmetricVertex;