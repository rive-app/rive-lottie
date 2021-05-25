const LottieStroke = require('./LottieStroke');
const { rgbaToVector } = require('../helpers/color');
const LottieGradientStop = require('./LottieGradientStop');
const math = require('./helpers/math');
const LottieGradientStroke = require('./LottieGradientStroke');
const LottieShapeTrimPath = require('./LottieShapeTrimPath');

const lineCapMap = {
  0: 1,
  1: 2,
  2: 3,
};
const lineJoinMap = {
  1: 2,
  2: 3,
  0: 1,
};

const fillTypes = {
  SOLID_COLOR: 'SolidColor',
  LINEAR_GRADIENT: 'LinearGradient',
  RADIAL_GRADIENT: 'RadialGradient',
  TRIM_PATH: 'TrimPath',
};

const createGradient = (gradient) => {
  const lottieGradient = Object.seal(new LottieGradientStroke());
  lottieGradient.colorId = gradient.id;
  lottieGradient.startX.value = gradient.startX;
  lottieGradient.startY.value = gradient.startY;
  lottieGradient.endX.value = gradient.endX;
  lottieGradient.endY.value = gradient.endY;
  lottieGradient.opacity.value = math.toHundred(gradient.opacity);
  gradient.children.forEach((child) => {
    const lottieStop = Object.seal(new LottieGradientStop());
    lottieStop.color.value = child.color;
    lottieStop.position.value = child.position;
    lottieStop.id = child.id;
    lottieGradient.addStop(lottieStop);
  });
  return lottieGradient;
};

const createRadialGradient = (gradient, stroke) => {
  const lottieGradient = createGradient(gradient);
  lottieGradient.id = stroke.id;
  lottieGradient.gradientType = 'radial';
  lottieGradient.strokeWidth.value = stroke.thickness;
  return lottieGradient;
};

const createLinearGradient = (gradient, stroke) => {
  const lottieGradient = createGradient(gradient);
  lottieGradient.gradientType = 'linear';
  lottieGradient.strokeWidth.value = stroke.thickness;
  return lottieGradient;
};

const createSolidColor = (solidColor, stroke) => {
  const lottieStroke = new LottieStroke();
  lottieStroke.id = stroke.id;
  lottieStroke.colorId = solidColor.id;
  lottieStroke.lineCap = lineCapMap[stroke.cap];
  lottieStroke.lineJoin = lineJoinMap[stroke.join];
  const { opacity } = lottieStroke;
  const { color } = lottieStroke;
  const { strokeWidth } = lottieStroke;
  const vectorColor = rgbaToVector(solidColor.color);
  // eslint-disable-next-line prefer-destructuring
  opacity.value = vectorColor[3];
  color.value = vectorColor;
  strokeWidth.value = stroke.thickness;
  return lottieStroke;
};

const createTrimPath = (trimPath) => {
  const lottieTrimPath = new LottieShapeTrimPath();
  lottieTrimPath.start.value = math.toHundred(trimPath.start);
  lottieTrimPath.end.value = math.toHundred(trimPath.end);
  lottieTrimPath.offset.value = math.toDegs(trimPath.offset);
  lottieTrimPath.id = trimPath.id;
  return lottieTrimPath;
};

const createNone = () => null;

const fillCreators = {
  [fillTypes.SOLID_COLOR]: createSolidColor,
  [fillTypes.LINEAR_GRADIENT]: createLinearGradient,
  [fillTypes.RADIAL_GRADIENT]: createRadialGradient,
  [fillTypes.TRIM_PATH]: createTrimPath,
  [fillTypes.NONE]: createNone,
};

const createStroke = (element, stroke) => {
  if (fillCreators[element.type]) {
    return fillCreators[element.type](element, stroke);
  }
  return createNone(element, stroke);
};

const strokeFactory = (stroke) => {
  const { children } = stroke;
  const strokes = children.map((strokeFill) => createStroke(strokeFill, stroke));
  return strokes;
};

module.exports = strokeFactory;
