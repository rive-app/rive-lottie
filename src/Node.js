const TransformComponent = require('./TransformComponent');

class Node extends TransformComponent {

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    _setX(reader) {
        this._x = reader.readFloat32();
    }

    _setY(reader) {
        this._y = reader.readFloat32();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[13] = this._setX.bind(this);
        this._properties[14] = this._setY.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._x = 0;
        this._y = 0;
    }
}

module.exports = Node;