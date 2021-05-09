const ContainerComponent = require("./ContainerComponent");

class LinearGradient extends ContainerComponent {
    
    get startX() {
        return this._startX;
    }
    
    get startY() {
        return this._startY;
    }
    
    get endX() {
        return this._endX;
    }
    
    get endY() {
        return this._endY;
    }
    
    get opacity() {
        return this._opacity;
    }

    _setStartX(reader) {
        this._startX = reader.readFloat32();
    }
    
    _setStartY(reader) {
        this._startY = reader.readFloat32();
    }
    
    _setEndX(reader) {
        this._endX = reader.readFloat32();
    }
    
    _setEndY(reader) {
        this._endY = reader.readFloat32();
    }
    
    _setOpacity(reader) {
        this._opacity = reader.readFloat32();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers()
        this._properties[42] = this._setStartX.bind(this);
        this._properties[33] = this._setStartY.bind(this);
        this._properties[34] = this._setEndX.bind(this);
        this._properties[35] = this._setEndY.bind(this);
        this._properties[46] = this._setOpacity.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._startX = 0;
        this._startY = 0;
        this._endX = 0;
        this._endY = 0;
        this._opacity = 1;
    }
}

module.exports = LinearGradient;
