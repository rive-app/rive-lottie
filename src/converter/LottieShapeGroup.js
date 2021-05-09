const LottieShapeContent = require("./LottieShapeContent");
const LottieTransform = require("./LottieTransform");

class LottieShapeGroup extends LottieShapeContent {

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
        shape.parent = this;
        this._shapes.push(shape);
    }

    addShapeAt(shape, index) {
        this._shapes.splice(index, 0, shape);
    }

    getShapeAt(index) {
        return this._shapes[index];
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

    serializeChildren() {
        return this._shapes.map(shape => shape.serialize())
    }

    serialize() {
        return {
            ty: 'gr',
            it: [
                ...this.serializeChildren(),
                {
                    ...this._transform.serialize(),
                    ty: 'tr',
                }
            ]
        }
    }

    _transform = new LottieTransform();
    _shapes = [];
    _id = '';
    _shapeType = '';
}

module.exports = LottieShapeGroup;