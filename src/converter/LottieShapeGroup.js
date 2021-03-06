const LottieShapeContent = require('./LottieShapeContent');
const LottieTransform = require('./LottieTransform');

const shapeTypes = {
  RECTANGLE: 'LottieShapeRectangle',
  ELLIPSE: 'LottieShapeEllipse',
  POLYGON: 'LottieShapePolygon',
  SHAPE: 'LottieShapePath',
  GROUP: 'LottieShapeGroup',
};

const flattennableShapes = Object.values(shapeTypes);

class LottieShapeGroup extends LottieShapeContent {
  constructor() {
    super();
    this._transform = new LottieTransform();
    this._shapes = [];
    this._id = '';
    this._shapeType = '';
  }

  get transform() {
    return this._transform;
  }

  set transform(val) {
    this._transform = val;
  }

  set shapeType(val) {
    this._shapeType = val;
  }

  get shapeType() {
    return this._shapeType;
  }

  get shapes() {
    return this._shapes;
  }

  addShape(shape) {
    // eslint-disable-next-line no-param-reassign
    shape.parent = this;
    this._shapes.push(shape);
  }

  addShapes(shapes) {
    shapes.forEach((shape) => this.addShape(shape));
  }

  addShapeAt(shape, index) {
    // eslint-disable-next-line no-param-reassign
    shape.parent = this;
    this._shapes.splice(index, 0, shape);
  }

  getShapeAt(index) {
    return this._shapes[index];
  }

  removeShapeAt(index) {
    this._shapes.splice(index, 1);
  }

  clearShapes() {
    this._shapes = [];
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

  getShapeById(id) {
    let shape = super.getShapeById(id);
    if (!shape) {
      for (let i = 0; i < this._shapes.length; i += 1) {
        shape = this._shapes[i].getShapeById(id);
        if (shape) {
          break;
        }
      }
    }
    return shape;
  }

  flattenUnexportableShapes(riveArtboard, riveAnimation) {
    this._shapes.forEach((shape) => {
      if (flattennableShapes.includes(shape.type)) {
        shape.flattenUnexportableShapes(riveArtboard, riveAnimation);
      }
    });
  }

  serializeChildren(riveModule) {
    return this._shapes.map((shape) => shape.serialize(riveModule));
  }

  serialize(riveModule) {
    return {
      ty: 'gr',
      it: [
        ...this.serializeChildren(riveModule),
        {
          ...this._transform.serialize(),
          ty: 'tr',
        },
      ],
    };
  }
}

module.exports = LottieShapeGroup;
