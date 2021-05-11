const Component = require('./Component');

class Artboard extends Component {
  resolve() {
    this._resolveParenting();
    this._resolveAnimations();
  }

  get children() {
    return this._children;
  }

  get animations() {
    return this._animations;
  }

  get width() {
    return this._w;
  }

  get height() {
    return this._h;
  }

  get name() {
    return this._name;
  }

  addChild(child) {
    // eslint-disable-next-line no-param-reassign
    child.id = this._children.length;
    this._children.push(child);
  }

  addAnimation(animation) {
    this._animations.push(animation);
  }

  _initializeValues() {
    super._initializeValues();
    this._w = 0;
    this._h = 0;
    this._x = 0;
    this._y = 0;
    this._ox = 0;
    this._oy = 0;
    this._children = [this];
    this._animations = [];
  }

  _setWidth(reader) {
    this._w = reader.readFloat32();
  }

  _setHeight(reader) {
    this._h = reader.readFloat32();
  }

  _setX(reader) {
    this._x = reader.readFloat32();
  }

  _setY(reader) {
    this._y = reader.readFloat32();
  }

  _setOX(reader) {
    this._ox = reader.readFloat32();
  }

  _setOY(reader) {
    this._oy = reader.readFloat32();
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[7] = this._setWidth.bind(this);
    this._properties[8] = this._setHeight.bind(this);
    this._properties[9] = this._setX.bind(this);
    this._properties[10] = this._setY.bind(this);
    this._properties[11] = this._setOX.bind(this);
    this._properties[12] = this._setOY.bind(this);
  }

  _resolveParenting() {
    const children = this._children;
    children.forEach((child) => {
      // console.log(child.name,'[--]',child.type,'[--]',child.id)
      if (child.parentId) {
        // console.log('parent: ',children[child.parentId].type, '; id: ', child.parentId);
        // eslint-disable-next-line no-param-reassign
        child.parent = children[child.parentId];
        children[child.parentId].addChild(child);
      }
    });
  }

  _resolveAnimations() {
    const animations = this._animations;
    animations.forEach((animation) => animation.resolve(this._children));
  }
}

module.exports = Artboard;
