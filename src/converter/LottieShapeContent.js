class LottieShapeContent {
  constructor() {
    this._type = this.constructor.name;
    this._id = null;
    this._parent = null;
    this._name = '';
  }

  get type() {
    return this._type;
  }

  set id(id) {
    this._id = id;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get parent() {
    return this._parent;
  }

  set parent(val) {
    this._parent = val;
  }

  getShapeById(id) {
    return id === this._id ? this : null;
  }
}

module.exports = LottieShapeContent;
