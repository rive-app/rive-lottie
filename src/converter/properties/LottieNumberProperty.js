const LottieProperty = require('./LottieProperty');

class LottieNumberProperty extends LottieProperty {
  constructor(value = 0) {
    super();
    this.value = value;
  }

  addKeyframe(value, ...args) {
    super.addKeyframe([value], ...args);
  }

  set value(value) {
    super.value = [value];
  }

  get value() {
    return super.value;
  }

  // eslint-disable-next-line class-methods-use-this
  validate(value) {
    return Array.isArray(value) && !Number.isNaN(Number(value[0]));
  }

  serialize() {
    if (this._value !== null) {
      return {
        a: 0,
        k: this._value[0],
      };
    }
    return super.serialize();
  }
}

module.exports = LottieNumberProperty;
