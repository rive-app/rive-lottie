class RiveObject extends Object {
  constructor(reader) {
    super();
    this._properties = {};
    this._initializeValues();
    this._registerPropertyHandlers();
    this._iterateProperties(reader);
  }

  _iterateProperties(reader) {
    while (!reader.isEOF()) {
      const value = reader.readVarUint();
      // console.log('value', value);
      if (value === 0) {
        break;
      } else if (this._properties[value]) {
        this._properties[value](reader);
      } else {
        // eslint-disable-next-line no-console
        console.log('UNHANDLED PROP: ', value);
        // eslint-disable-next-line no-console
        console.log('', this.constructor.name);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _registerPropertyHandlers() {
  }

  // eslint-disable-next-line class-methods-use-this
  _initializeValues() {
  }

  get type() {
    return this.constructor.name;
  }
}

module.exports = RiveObject;
