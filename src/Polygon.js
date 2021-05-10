const ParametricPath = require('./ParametricPath');

class Polygon extends ParametricPath {
  _initializeValues() {
    super._initializeValues();
    this._points = 5;
    this._cornerRadius = 0;
  }

  _setPoints(reader) {
    this._points = reader.readVarUint();
  }

  _setCornerRadius(reader) {
    this._cornerRadius = reader.readFloat32();
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[125] = this._setPoints.bind(this);
    this._properties[126] = this._setCornerRadius.bind(this);
  }
}

module.exports = Polygon;
