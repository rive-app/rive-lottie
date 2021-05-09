const Component = require("./Component");
const {uin32ToRgba} = require('./helpers/color');

class GradientStop extends Component {
    
    get color() {
        return this._color;
    }
    
    get position() {
        return this._position;
    }

    _setColor(reader) {
        const color = reader.readUint32();
        this._color = uin32ToRgba(color);
    }

    _setPosition(reader) {
        this._position = reader.readFloat32();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers()
        this._properties[38] = this._setColor.bind(this);
        this._properties[39] = this._setPosition.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._color = {
            r: 255,
            g: 255,
            b: 255,
            a: 255,
        };
        this._position = 0;
    }
}

module.exports = GradientStop;
