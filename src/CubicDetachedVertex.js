const CubicVertex = require('./CubicVertex');

class CubicDetachedVertex extends CubicVertex {
  _setInRotation(reader) {
    this._inRotation = reader.readFloat32();
  }

  _setOutRotation(reader) {
    this._outRotation = reader.readFloat32();
  }

  _setInDistance(reader) {
    this._inDistance = reader.readFloat32();
  }

  _setOutDistance(reader) {
    this._outDistance = reader.readFloat32();
  }

  get inRotation() {
    return this._inRotation;
  }

  get outRotation() {
    return this._outRotation;
  }

  get inDistance() {
    return this._inDistance;
  }

  get outDistance() {
    return this._outDistance;
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[84] = this._setInRotation.bind(this);
    this._properties[85] = this._setInDistance.bind(this);
    this._properties[86] = this._setOutRotation.bind(this);
    this._properties[87] = this._setOutDistance.bind(this);
  }

  _initializeValues() {
    super._initializeValues();
    this._inRotation = 0;
    this._outRotation = 0;
    this._inDistance = 0;
    this._outDistance = 0;
  }
}

module.exports = CubicDetachedVertex;
