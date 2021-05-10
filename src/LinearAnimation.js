const Animation = require('./Animation');
const bool = require('./helpers/boolean');

class LinearAnimation extends Animation {

    get objects() {
        return this._objects;
    }

    get fps() {
        return this._fps;
    }

    get duration() {
        return this._duration;
    }

    get workStart() {
        return this._workStart;
    }

    get workEnd() {
        return this._workEnd;
    }

    addObject(keyedObject) {
        this._objects.push(keyedObject);
    }

    resolve(children) {
        this._objects.forEach(object => object.resolve(children));
    }

    _initializeValues() {
        super._initializeValues();
        this._fps = 60;
        this._duration = 60;
        this._speed = 1;
        this._loopValue = 0;
        this._workStart = -1;
        this._workEnd = -1;
        this._enableWorkArea = false;
        this._objects = [];
    }

    _setFPS(reader) {
        this._fps = reader.readVarUint();
    }

    _setDuration(reader) {
        this._duration = reader.readVarUint();
    }

    _setSpeed(reader) {
        this._speed = reader.readFloat32();
    }

    _setLoopValue(reader) {
        this._loopValue = reader.readVarUint();
    }

    _setWorkStart(reader) {
        this._workStart = reader.readVarUint();
    }

    _setWorkEnd(reader) {
        this._workEnd = reader.readVarUint();
    }

    _setEnableWorkArea(reader) {
        this._enableWorkArea = bool(reader);
        // TODO implement with readByte
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[56] = this._setFPS.bind(this);
        this._properties[57] = this._setDuration.bind(this);
        this._properties[58] = this._setSpeed.bind(this);
        this._properties[59] = this._setLoopValue.bind(this);
        this._properties[60] = this._setWorkStart.bind(this);
        this._properties[61] = this._setWorkEnd.bind(this);
        this._properties[62] = this._setEnableWorkArea.bind(this);
    }
}

module.exports = LinearAnimation;