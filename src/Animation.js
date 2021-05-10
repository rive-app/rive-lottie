const RiveObject = require('./RiveObject');

class Animation extends RiveObject {
  _setName(reader) {
    this._name = reader.readString();
  }

  _initializeValues() {
    super._initializeValues();
    this._name = '';
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[55] = this._setName.bind(this);
  }
}

module.exports = Animation;
