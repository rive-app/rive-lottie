const LottieProperty = require('./LottieProperty');

class LottieColorProperty extends LottieProperty {
  constructor(value = [1, 0, 0, 0]) {
    super();
    this.value = value;
  }

  validate(value) {
    // TODO: implement
    return super.validate(value);
  }
}

module.exports = LottieColorProperty;
