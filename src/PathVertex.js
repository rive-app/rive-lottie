const ContainerComponent = require('./ContainerComponent');

class PathVertex extends ContainerComponent {
    _setX(reader) {
        this._x = reader.readFloat32();
    }
    _setY(reader) {
        this._y = reader.readFloat32();
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[24] = this._setX.bind(this);
        this._properties[25] = this._setY.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._x = 0;
        this._y = 0;
    }
}

module.exports = PathVertex;