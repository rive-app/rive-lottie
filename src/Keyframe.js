const RiveObject = require('./RiveObject');

class Keyframe extends RiveObject {

    resolve(children) {
        if (this._interpolatorId) {
            this._interpolator = children[this._interpolatorId];
        }
    }

    set id(val) {
        this._id = val;
    }

    get id() {
        return this._id;
    }

    get frame() {
        return this._frame;
    }

    get interpolationType() {
        return this._interpolationType;
    }

    get interpolator() {
        return this._interpolator;
    }

    _id = '';

    _initializeValues() {
        super._initializeValues();
        this._frame = 0;
        this._interpolationType = 0;
        this._interpolatorId = 0;
        this._interpolator = null;
    }

    _setFrame(reader) {
        this._frame = reader.readVarUint();
    }

    _setInterpolationType(reader) {
        this._interpolationType = reader.readVarUint();
    }

    _setInterpolatorId(reader) {
        this._interpolatorId = reader.readVarUint();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[67] = this._setFrame.bind(this);
        this._properties[68] = this._setInterpolationType.bind(this);
        this._properties[69] = this._setInterpolatorId.bind(this);
    }

    get interpolatorId() {
        return this._interpolatorId;
    }
}

module.exports = Keyframe;
