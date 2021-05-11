const LottieProperty = require('./LottieProperty');

class LottieArrayProperty extends LottieProperty {
  constructor(value = [0, 0]) {
    super();
    this.value = value;
  }

  // eslint-disable-next-line class-methods-use-this
  validate(value) {
    return Array.isArray(value);
  }
}

module.exports = LottieArrayProperty;
