const Path = require('./Path');
const bool = require('./helpers/boolean');

class PointsPath extends Path {
  _setIsClosed(reader) {
    this._isClosed = bool(reader);
  }

  get isClosed() {
    return this._isClosed;
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[32] = this._setIsClosed.bind(this);
  }

  _initializeValues() {
    super._initializeValues();
    this._isClosed = false;
  }
}

module.exports = PointsPath;
