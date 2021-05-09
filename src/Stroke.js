const ShapePaint = require('./ShapePaint');

class Stroke extends ShapePaint {

    get thickness() {
        return this._thickness;
    }

    get cap() {
        return this._cap;
    }
    
    get join() {
        return this._join;
    }

    _initializeValues() {
        super._initializeValues();
        this._thickness = 1;
        this._cap = 0;
        this._join = 0;
        this._transformAffectsStroke = true;
    }

    _setThickness(reader) {
        this._thickness = reader.readFloat32();
    }

    _setCap(reader) {
        this._cap = reader.readUint8();
    }

    _setJoin(reader) {
        this._join = reader.readUint8();
    }

    _setTransformAffectsStroke(reader) {
        this._transformAffectsStroke = reader.readUint8() === 1;
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[47] = this._setThickness.bind(this);
        this._properties[48] = this._setCap.bind(this);
        this._properties[49] = this._setJoin.bind(this);
        this._properties[50] = this._setTransformAffectsStroke.bind(this);
    }
}

module.exports = Stroke;