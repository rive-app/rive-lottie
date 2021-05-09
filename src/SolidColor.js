const Component = require('./Component');
const {uin32ToRgba} = require('./helpers/color');

class SolidColor extends Component {

    get color() {
        return this._color;
    }

    _setColor(reader) {
        const color = reader.readUint32();
        this._color = uin32ToRgba(color);
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers()
        this._properties[37] = this._setColor.bind(this);
    }

    _initializeValues() {
        super._initializeValues();
        this._color = {
            r: 116,
            g: 116,
            b: 116,
            a: 100,
        };
    }
}

module.exports = SolidColor;