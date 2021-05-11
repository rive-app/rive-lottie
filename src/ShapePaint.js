const Component = require('./Component');
const bool = require('./helpers/boolean');

class ShapePaint extends Component {
  constructor(reader) {
    super(reader);
    this._isVisible = true;
  }

  _setIsVisible(reader) {
    this._isVisible = bool(reader);
  }

  registerProperties() {
    super.registerProperties();
    this._properties[41] = this._setIsVisible.bind(this);
  }
}

module.exports = ShapePaint;
