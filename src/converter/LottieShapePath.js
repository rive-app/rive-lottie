const LottieShapeContent = require('./LottieShapeContent');
const LottieVertexProperty = require('./properties/LottieVertexProperty');

class LottieShapePath extends LottieShapeContent {
  constructor() {
    super();
    this._vertices = new LottieVertexProperty();
  }

  addVertex(vertex) {
    this._vertices.addVertex(vertex);
  }

  set closed(val) {
    this._vertices.closed = val;
  }

  getShapeById(id) {
    return super.getShapeById(id) || this._vertices.getObjectById(id);
  }

  serialize() {
    return {
      ty: 'sh',
      ks: this._vertices.serialize(),
    };
  }
}

module.exports = LottieShapePath;
