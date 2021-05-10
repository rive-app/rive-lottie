const RiveObject = require('./RiveObject');

class KeyedProperty extends RiveObject {
  get propertyKey() {
    return this._propertyKey;
  }

  get keyframes() {
    return this._keyframes;
  }

  addKeyframe(keyframe) {
    this._keyframes.push(keyframe);
  }

  resolve(children) {
    this._keyframes.forEach((keyframe) => keyframe.resolve(children));
  }

  _initializeValues() {
    super._initializeValues();
    this._propertyKey = 0;
    this._keyframes = [];
  }

  _setPropertyKey(reader) {
    this._propertyKey = reader.readVarUint();
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[53] = this._setPropertyKey.bind(this);
  }
}

module.exports = KeyedProperty;
