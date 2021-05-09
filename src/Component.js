const RiveObject = require('./RiveObject');

class Component extends RiveObject {

    get parentId() {
        return this._parentId;
    }
    
    set id(id) {
        this._id = id;
    }
    
    get id() {
        return this._id;
    }

    set parent(parent) {
        this._parent = parent;
    }

    get parent() {
        return this._parent;
    }

    get children() {
        return this._children;
    }

    get name() {
        return this._name;
    }

    addChild(child) {
        this._children.push(child);
    }

    _initializeValues() {
        super._initializeValues();
        this._parentId = undefined;
        this._id = 0;
        this._parent = null;
        this._children = [];
        this._name = '';
        this._dependentIds = [];
        this._childOrder = [];
        this._flags = false;
    }

    _setDependentIds(reader) {
        // TODO: implement
    }

    _setName(reader) {
        this._name = reader.readString();
    }

    _setParentId(reader) {
        this._parentId = reader.readUint8();
    }

    _setChildOrder(reader) {
        // TODO: implement
    }

    _setFlags(reader) {
        // TODO: implement
    }

    _registerPropertyHandlers() {
        super._registerPropertyHandlers();
        this._properties[3] = this._setDependentIds.bind(this);
        this._properties[4] = this._setName.bind(this);
        this._properties[5] = this._setParentId.bind(this);
        this._properties[6] = this._setChildOrder.bind(this);
        this._properties[130] = this._setFlags.bind(this);
    }
}

module.exports = Component;
