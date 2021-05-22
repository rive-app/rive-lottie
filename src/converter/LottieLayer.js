const LottieTransform = require('./LottieTransform');

class LottieLayer {
  constructor(id) {
    this._id = id;
    this._parentId = undefined;
    this._parentPreComp = null;
    this._type = this.constructor.name;
    this._transform = new LottieTransform();
  }

  getObjectById(id) {
    return this._id === id ? this : null;
  }

  get type() {
    return this._type;
  }

  get parentId() {
    return this._parentId;
  }

  set parentId(val) {
    this._parentId = val;
  }

  get id() {
    return this._id;
  }

  set id(val) {
    this._id = val;
  }

  get transform() {
    return this._transform;
  }

  set transform(transform) {
    this._transform = transform;
  }

  set parentPreComp(preComp) {
    this._parentPreComp = preComp;
  }

  get parentPreComp() {
    return this._parentPreComp;
  }

  serialize() {
    return {
      ks: this.transform.serialize(),
      ip: 0,
      op: 200,
      st: 0,
      sr: 1,
      bm: 0,
      ind: this._id,
      parent: this._parentId,
    };
  }
}

LottieLayer.ids = 1000;

module.exports = LottieLayer;
