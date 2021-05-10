const LottieAnimation = require('./LottieAnimation');
const LottieNull = require('./LottieNull');
const shapeFactory = require('./shapeFactory');
const nullFactory = require('./nullFactory');
const addAnimations = require('./animations/animations');

const layerTypes = {
  SHAPE: 'Shape',
  NODE: 'Node',
};

const renderableElements = [
  layerTypes.SHAPE,
  layerTypes.NODE,
];
const getRootElements = (children) => children.filter((child) => child.parentId === 0 && renderableElements.includes(child.type));

const createLottieAnimations = (artboard) => {
  const totalAnimations = Math.max(artboard.animations.length, 1);
  const animations = [];
  for (let i = 0; i < totalAnimations; i += 1) {
    const lottieAnimation = new LottieAnimation(artboard.width, artboard.height);
    if (artboard.animations[i]) {
      lottieAnimation.frameRate = artboard.animations[i].fps;
      if (artboard.animations[i].workStart !== -1) {
        lottieAnimation.inPoint = artboard.animations[i].workStart;
      }
      lottieAnimation.outPoint = artboard.animations[i].workEnd === -1
        ? artboard.animations[i].duration
        : artboard.animations[i].workEnd;
    }
    animations.push(lottieAnimation);
  }
  return animations;
};

const createNull = (nullData) => [new LottieNull()];

const layerCreators = {
  [layerTypes.SHAPE]: shapeFactory,
  [layerTypes.NODE]: nullFactory,
};

const createLayersFromElement = (element) => {
  if (layerCreators[element.type]) {
    return layerCreators[element.type](element, undefined);
  }

  return createNull(element);
};

const addElements = (lottieAnimations, artboard) => {
  const rootElements = getRootElements(artboard.children);
  lottieAnimations.forEach((lottie) => {
    rootElements.forEach((element) => {
      const layers = createLayersFromElement(element, element.id);
      layers
        .forEach((layer) => lottie.addLayer(layer));
    });
  });
};

const createAnimationsFromArtboard = (artboard) => {
  const lottieAnimations = createLottieAnimations(artboard);
  addElements(lottieAnimations, artboard);
  addAnimations(lottieAnimations, artboard);
  return lottieAnimations;
};

module.exports = createAnimationsFromArtboard;
