const CubicVertex = require('./CubicVertex');

class CubicMirroredVertex extends CubicVertex {

    _setRotation(reader) {
        this._rotation = reader.readFloat32();
    }

    _setDistance(reader) {
        this._distance = reader.readFloat32();
    }

    get rotation() {
        return this._rotation;
    }

    get distance() {
        return this._distance;
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[82] = this._setRotation.bind(this);
        this._properties[83] = this._setDistance.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._rotation = 0;
        this._distance = 0;
    }
}

module.exports = CubicMirroredVertex;