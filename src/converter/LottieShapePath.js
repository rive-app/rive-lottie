const LottieShapeContent = require("./LottieShapeContent");
const LottieVertexProperty = require("./properties/LottieVertexProperty");

class LottieShapePath extends LottieShapeContent {

    addVertex(vertex) {
        this._vertices.addVertex(vertex);
    }

    set closed(val) {
        this._vertices.closed = val;
    }

    _vertices = new LottieVertexProperty();

    getShapeById(id) {
        return super.getShapeById(id) || this._vertices.getObjectById(id);
    }

    serialize() {
        return {
            ty: 'sh',
            ks: this._vertices.serialize(),
        }
    }
}

module.exports = LottieShapePath;