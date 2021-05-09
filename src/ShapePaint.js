const Component = require('./Component');

class ShapePaint extends Component {
    _isVisible = true;

    _setIsVisible(reader) {
        // TODO implement with boolean
    }

    registerProperties() {
        super.registerProperties();
        this._properties[41] = this._setIsVisible.bind(this);
    }
}

module.exports = ShapePaint;