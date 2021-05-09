const layerProperties = require('./helpers/layerProperties');
const LottieNull = require('./LottieNull');
const shapeFactory = require('./shapeFactory');

const layerTypes = {
    SHAPE: 'Shape',
    POINTS_PATH: 'PointsPath',
    NODE: 'Node',
}

const nullFactory = (nullElement, parentId) => {
    const lottieObject = new LottieNull(nullElement.id);
    lottieObject.parentId = parentId;
    layerProperties(lottieObject, nullElement);
    const children = nullElement.children.map(child => createLayersFromElement(child, lottieObject.id));
    return [lottieObject, children.flat()].flat();
}

const layerCreators = {
    [layerTypes.SHAPE]: shapeFactory,
    [layerTypes.POINTS_PATH]: shapeFactory,
    [layerTypes.NODE]: nullFactory,
}

const createLayersFromElement = (element, parentId) => {
    if (layerCreators[element.type]) {
        return layerCreators[element.type](element, parentId);
    }
    else return createNull(element);
}

module.exports = nullFactory;