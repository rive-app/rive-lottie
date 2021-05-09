const RiveObject = require('./RiveObject');

class CubicInterpolator extends RiveObject {
    _initializeValues() {
        super._initializeValues();
        this._x1 = 0.42;
        this._y1 = 0;
        this._x2 = 0.58;
        this._y2 = 1;
        this._id = '';
    }

    get id() {
        return this._id;
    }

    get x1() {
        return this._x1;
    }

    get y1() {
        return this._y1;
    }

    get x2() {
        return this._x2;
    }

    get y2() {
        return this._y2;
    }

    set id(id) {
        this._id = id;
    }

    _setX1(reader) {
        this._x1 = reader.readFloat32();
    }

    _setY1(reader) {
        this._y1 = reader.readFloat32();
    }

    _setX2(reader) {
        this._x2 = reader.readFloat32();
    }

    _setY2(reader) {
        this._y2 = reader.readFloat32();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[63] = this._setX1.bind(this);
        this._properties[64] = this._setY1.bind(this);
        this._properties[65] = this._setX2.bind(this);
        this._properties[66] = this._setY2.bind(this);
    }
}

module.exports = CubicInterpolator;