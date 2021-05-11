class Header {
  constructor(reader) {
    this._isValid = false;
    this._majorVersion = '';
    this._minorVersion = '';
    this._fileId = '';
    this._propertyKeys = [];
    this._reader = reader;
  }

  _readPropertyKeys(reader) {
    for (
      let propertyKey = reader.readVarUint();
      propertyKey !== 0;
      propertyKey = reader.readVarUint()
    ) {
      this._propertyKeys.push(propertyKey);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _checkSignature(reader) {
    const signature = 'RIVE';
    for (let i = 0; i < signature.length; i += 1) {
      if (signature.charCodeAt(i) !== reader.readUint8()) {
        return false;
      }
    }
    return true;
  }

  parse() {
    const reader = this._reader;
    this._isValid = this._checkSignature(reader);
    this._majorVersion = reader.readVarUint();
    this._minorVersion = reader.readVarUint();
    this._fileId = reader.readVarUint();
    this.propertyKeys = this._readPropertyKeys(reader);
  }

  get valid() {
    return this._isValid;
  }
}

module.exports = Header;
