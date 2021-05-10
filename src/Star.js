const Polygon = require('./Polygon');

class Star extends Polygon {
  _initializeValues() {
    super._initializeValues();
    this._innerRadius = 0.5;
  }

  _setInnerRadius(reader) {
    this._innerRadius = reader.readFloat32();
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[127] = this._setInnerRadius.bind(this);
  }
}

module.exports = Star;
