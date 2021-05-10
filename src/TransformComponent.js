const ContainerComponent = require('./ContainerComponent');

class TransformComponent extends ContainerComponent {
  get scaleX() {
    return this._scaleX;
  }

  get scaleY() {
    return this._scaleY;
  }

  get opacity() {
    return this._opacity;
  }

  get rotation() {
    return this._rotation;
  }

  _setRotation(reader) {
    this._rotation = reader.readFloat32();
  }

  _setScaleX(reader) {
    this._scaleX = reader.readFloat32();
  }

  _setScaleY(reader) {
    this._scaleY = reader.readFloat32();
  }

  _setOpacity(reader) {
    this._opacity = reader.readFloat32();
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[15] = this._setRotation.bind(this);
    this._properties[16] = this._setScaleX.bind(this);
    this._properties[17] = this._setScaleY.bind(this);
    this._properties[18] = this._setOpacity.bind(this);
  }

  _initializeValues() {
    super._initializeValues();
    this._rotation = 0;
    this._scaleX = 1;
    this._scaleY = 1;
    this._opacity = 1;
  }
}

module.exports = TransformComponent;
