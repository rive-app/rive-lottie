const RiveObject = require('./RiveObject');

class KeyedObject extends RiveObject {

    get id() {
        return this._id;
    }

    get keyedProperties() {
        return this._keyedProperties;
    }

    addProperty(property) {
        this._keyedProperties.push(property);
    }

    resolve(children) {
        this._keyedProperties.forEach(property => property.resolve(children));
    }

    _initializeValues() {
        super._initializeValues();
        this._id = '';
        this._keyedProperties = [];
    }

    _setId(reader) {
        this._id = reader.readVarUint();
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[51] = this._setId.bind(this);
    }
}

module.exports = KeyedObject;
