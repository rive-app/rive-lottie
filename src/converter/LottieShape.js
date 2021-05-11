const LottieLayer = require('./LottieLayer');

class LottieShape extends LottieLayer {
  constructor(id) {
    super(id);
    this._shapes = [];
  }

  get shapes() {
    return this._shapes;
  }

  addShape(shape) {
    // eslint-disable-next-line no-param-reassign
    shape.parent = this;
    this._shapes.push(shape);
  }

  addShapeAt(shape, index) {
    // eslint-disable-next-line no-param-reassign
    shape.parent = this;
    this._shapes.splice(index, 0, shape);
  }

  getLastIndexType(types) {
    let index = this._shapes.length - 1;
    while (index >= 0) {
      if (!types.includes(this._shapes[index].type)) {
        return index + 1;
      }
      index -= 1;
    }
    return index;
  }

  getShapeAt(index) {
    return this._shapes[index];
  }

  getShapeById(id) {
    let shape = null;
    for (let i = 0; i < this._shapes.length; i += 1) {
      shape = this._shapes[i].getShapeById(id);
      if (shape) {
        break;
      }
    }
    return shape;
  }

  getObjectById(id) {
    return super.getObjectById(id) || this.getShapeById(id);
  }

  serializeShapes() {
    return {
      shapes: this._shapes
        .map((shape) => shape.serialize()),
    };
  }

  serialize() {
    return {
      ty: 4,
      sr: 1,
      ...super.serialize(),
      ...this.serializeShapes(),
    };
  }
}

module.exports = LottieShape;
