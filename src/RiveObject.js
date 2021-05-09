class RiveObject extends Object {
    
    constructor(reader) {
        super();
        this._initializeValues();
        this._registerPropertyHandlers();
        this._iterateProperties(reader);
    }

    _properties = {};

    _iterateProperties(reader) {
        while (!reader.isEOF()) {
            const value = reader.readVarUint();
            if (value === 0) {
                break;
            } else if (this._properties[value]) {
                this._properties[value](reader);
            } else {
                console.log('UNHANDLED PROP: ', value);
                console.log('', this.constructor.name);
            }
        }
        
    }

    _registerPropertyHandlers() {
    }

    _initializeValues() {
    }

    get type() {
        return this.constructor.name;
    }
}

module.exports = RiveObject;
