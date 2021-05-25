const Component = require('./Component');

class TrimPath extends Component {
  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }

  get offset() {
    return this._offset;
  }

  _setStart(reader) {
    this._start = reader.readFloat32();
  }

  _setEnd(reader) {
    this._end = reader.readFloat32();
  }

  _setOffset(reader) {
    this._offset = reader.readFloat32();
  }

  _setModeValue(reader) {
    this._modeValue = reader.readVarUint();
  }

  _registerPropertyHandlers() {
    super._registerPropertyHandlers();
    this._properties[114] = this._setStart.bind(this);
    this._properties[115] = this._setEnd.bind(this);
    this._properties[116] = this._setOffset.bind(this);
    this._properties[117] = this._setModeValue.bind(this);
  }

  _initializeValues() {
    super._initializeValues();
    this._start = 0;
    this._end = 0;
    this._offset = 0;
    this._modeValue = 0;
  }
}

module.exports = TrimPath;
