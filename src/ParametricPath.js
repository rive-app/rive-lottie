const Path = require('./Path');

class ParametricPath extends Path {

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get originx() {
        return this._originx;
    }
    get originy() {
        return this._originy;
    }

    _setWidth(reader) {
        this._width = reader.readFloat32();
    }

    _setHeight(reader) {
        this._height = reader.readFloat32();
    }

    _setOriginX(reader) {
        this._originx = reader.readFloat32();
    }

    _setOriginY(reader) {
        this._originy = reader.readFloat32();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[20] = this._setWidth.bind(this);
        this._properties[21] = this._setHeight.bind(this);
        this._properties[123] = this._setOriginX.bind(this);
        this._properties[124] = this._setOriginY.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._width = 0;
        this._height = 0;
        this._originx = 0.5;
        this._originy = 0.5;
    }
}

module.exports = ParametricPath;