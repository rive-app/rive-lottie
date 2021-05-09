const PathVertex = require('./PathVertex');

class StraightVertex extends PathVertex {
    
    _setRadius(reader) {
        this._radius = reader.readFloat32();
    }

    get radius() {
        return this._radius;
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[26] = this._setRadius.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._radius = 0;
    }
}

module.exports = StraightVertex;