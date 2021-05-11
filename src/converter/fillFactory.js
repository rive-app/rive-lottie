const LottieFill = require('./LottieFill');
const LottieGradientFill = require('./LottieGradientFill');
const { rgbaToVector } = require('../helpers/color');
const LottieGradientStop = require('./LottieGradientStop');
const math = require('./helpers/math');

const fillTypes = {
  SOLID_COLOR: 'SolidColor',
  RADIAL_GRADIENT: 'RadialGradient',
  LINEAR_GRADIENT: 'LinearGradient',
};

const createSolidColor = (solidColor) => {
  const lottieFill = new LottieFill();
  lottieFill.id = solidColor.id;
  lottieFill.name = solidColor.name;
  const { opacity } = lottieFill;
  const { color } = lottieFill;
  const vectorColor = rgbaToVector(solidColor.color);
  // eslint-disable-next-line prefer-destructuring
  opacity.value = vectorColor[3];
  color.value = vectorColor;
  return lottieFill;
};

const createGradient = (gradient) => {
  const lottieGradientFill = Object.seal(new LottieGradientFill());
  lottieGradientFill.id = gradient.id;
  lottieGradientFill.startX.value = gradient.startX;
  lottieGradientFill.startY.value = gradient.startY;
  lottieGradientFill.endX.value = gradient.endX;
  lottieGradientFill.endY.value = gradient.endY;
  lottieGradientFill.opacity.value = math.toHundred(gradient.opacity);
  gradient.children.forEach((child) => {
    const lottieStop = Object.seal(new LottieGradientStop());
    lottieStop.color.value = child.color;
    lottieStop.position.value = child.position;
    lottieStop.id = child.id;
    lottieGradientFill.addStop(lottieStop);
  });
  return lottieGradientFill;
};

const createRadialGradient = (radialGradient) => {
  const lottieGradientFill = createGradient(radialGradient);
  lottieGradientFill.gradientType = 'radial';
  return lottieGradientFill;
};

const createLinearGradient = (gradient) => {
  const lottieGradientFill = createGradient(gradient);
  lottieGradientFill.gradientType = 'linear';
  return lottieGradientFill;
};

const createNone = () => null;

const fillCreators = {
  [fillTypes.SOLID_COLOR]: createSolidColor,
  [fillTypes.RADIAL_GRADIENT]: createRadialGradient,
  [fillTypes.LINEAR_GRADIENT]: createLinearGradient,
  [fillTypes.NONE]: createNone,
};

const createFill = (element) => {
  if (fillCreators[element.type]) {
    return fillCreators[element.type](element);
  }
  return createNone(element);
};

const fillFactory = (fill) => {
  const { children } = fill;
  const fills = children.map(createFill);
  return fills;
};

module.exports = fillFactory;
