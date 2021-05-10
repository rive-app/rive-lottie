const LottieProperty = require('./LottieProperty');

class LottieArrayProperty extends LottieProperty {
  constructor(value = [0, 0]) {
    super();
    this.value = value;
  }

  validate(value) {
    return Array.isArray(value);
  }
}

module.exports = LottieArrayProperty;
