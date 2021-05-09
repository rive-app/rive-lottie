const LottieTransform = require("./LottieTransform");

class LottieLayer {

    constructor(id) {
        this._id = id;
        this._parent = undefined;
        this._type = this.constructor.name;
    }

    getObjectById(id) {
        return this._id === id ? this : null;
    }

    get type() {
        return this._type;
    }

    get parent() {
        return this._parent;
    }

    set parent(val) {
        this._parent = val;
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

    serialize() {
        return {
            ks: this.transform.serialize(),
            ip: 0,
            op: 200,
            st: 0,
            sr: 1,
            bm: 0,
            ind: this._id,
            parent: this._parent,
        }
    }

    _transform = new LottieTransform();
}

LottieLayer.ids = 1000;

module.exports = LottieLayer;