const math = require("../helpers/math");
const LottieLayer = require("../LottieLayer");
const LottieNull = require("../LottieNull");
const LottieShapeGroup = require("../LottieShapeGroup");
const LottieTransform = require("../LottieTransform");
const { inOutEasing, inOutOneDimensionEasing } = require('../properties/easings');

const iterateRegularProperty = (lottieProperty, keyframes, multiplier) => {
    keyframes.forEach(keyframe => {
        lottieProperty.addKeyframe(
            multiplier(keyframe.value),
            keyframe.frame,
            inOutEasing(keyframe))
    })
}

const iterateOneDimensionalProperty = (lottieProperty, keyframes, multiplier) => {
    keyframes.forEach(keyframe => {
        lottieProperty.addKeyframe(
            keyframe.value,
            keyframe.frame,
            inOutOneDimensionEasing(keyframe))
    })
}

const handleRotation = (keyframes, lottieObject) => {
    const transform = lottieObject.transform;
    const lottieProperty = transform.rotation;
    iterateRegularProperty(lottieProperty, keyframes, math.radsToDegs);
}

const handlePositionX = (keyframes, lottieObject) => {
    const transform = lottieObject.transform;
    const lottieProperty = transform.x;
    iterateRegularProperty(lottieProperty, keyframes, math.identity);
}

const handlePositionY = (keyframes, lottieObject) => {
    const transform = lottieObject.transform;
    const lottieProperty = transform.y;
    iterateRegularProperty(lottieProperty, keyframes, math.identity);
}

const handleScaleX = (keyframes, lottieObject, lottie) => {
    const transform = lottieObject.transform;
    const lottieProperty = transform.scale;
    const multiplier = math.toHundred;
    keyframes.forEach(keyframe => {
        lottieProperty.addKeyframe(
            [multiplier(keyframe.value), 100],
            keyframe.frame,
            inOutEasing(keyframe))
    })
}

const handleScaleY = (keyframes, lottieObject, lottie) => {
    const transform = lottieObject.transform;
    let lottieProperty = transform.scale;
    // Since Rive can animate scaleX and scaleY separatedly and Lottie can't
    // We are creating a null object or a group object that will load the object transform
    // And assign a clear transform to the original object
    if (lottieProperty.animated) {
        if (lottieObject.type === 'LottieShapeGroup') {
            const shapeGroup = new LottieShapeGroup();
            const lottieObjectParent = lottieObject.parent;
            const shapes = lottieObjectParent.shapes;
            const lottieObjectIndex = shapes.findIndex(shape => shape === lottieObject);
            lottieObjectParent.removeShapeAt(lottieObjectIndex);
            lottieObjectParent.addShapeAt(shapeGroup, lottieObjectIndex);
            shapeGroup.addShape(lottieObject);
            shapeGroup.transform = lottieObject.transform;
            const objectTransform = new LottieTransform();
            objectTransform.hasPositionSeparate = lottieObject.transform.hasPositionSeparate;
            lottieProperty = objectTransform.scale;
            lottieObject.transform = objectTransform;
        } else {
            const nullParent = new LottieNull();
            nullParent.id = LottieLayer.ids++;
            nullParent.transform = lottieObject.transform;
            nullParent.parentId = lottieObject.parentId;
            const objectTransform = new LottieTransform();
            objectTransform.hasPositionSeparate = lottieObject.transform.hasPositionSeparate;
            lottie.addLayer(nullParent);
            lottieProperty = objectTransform.scale;
            lottieObject.parentId = nullParent.id;
            lottieObject.transform = objectTransform;
        }
        
    }
    const multiplier = math.toHundred;
    keyframes.forEach(keyframe => {
        lottieProperty.addKeyframe(
            [100, multiplier(keyframe.value)],
            keyframe.frame,
            inOutEasing(keyframe))
    })
}

const handleShape = (keyframes, lottieObject, objectId, propertyKey) => {
    const vertices = lottieObject.vertices;
    const vertex = vertices.find(vertex => vertex.id === objectId)
    const vertexKeyframes = lottieObject.vertexKeyframes;
    keyframes.forEach(keyframe => {
        if (!vertexKeyframes[keyframe.frame]) {
            vertexKeyframes[keyframe.frame] = [];
        }
        const frameProperties = vertexKeyframes[keyframe.frame];
        frameProperties.push({
            objectId,
            propertyKey,
            value: keyframe.value,
            frame: keyframe.frame,
            interpolationType: keyframe.interpolationType,
            interpolator: keyframe.interpolator,
        })
    })
}

const handleShapeSize = (keyframes, lottieObject, propertyKey) => {
    const lottieRectangle = lottieObject.getShapeAt(0).getShapeAt(0);
    const lottieSize = lottieRectangle.size;
    const lottieProperty = propertyKey === 20
        ? lottieSize.x
        : lottieSize.y
    iterateRegularProperty(lottieProperty, keyframes, math.identity);
}

const handleColor = (keyframes, lottieObject) => {
    const lottieProperty = lottieObject.color;
    iterateOneDimensionalProperty(lottieProperty, keyframes, math.identity);
}

const handleGradientStopPosition = (keyframes, lottieObject) => {
    const lottieProperty = lottieObject.position;
    iterateOneDimensionalProperty(lottieProperty, keyframes, math.identity);
}

const handleStrokeThickness = (keyframes, lottieObject) => {
    const lottieProperty = lottieObject.strokeWidth;
    iterateRegularProperty(lottieProperty, keyframes, math.identity);
}

const handleOpacity = (keyframes, lottieObject) => {
    const lottieProperty = lottieObject.transform.opacity;
    iterateRegularProperty(lottieProperty, keyframes, math.toHundred);
}

const setAnimatedProperties = (properties, objectId, lottie) => {
    const lottieObject = lottie.getObjectById(objectId);
    properties.forEach(animatedProperty => {
        const keyframes = animatedProperty.keyframes;
        if (animatedProperty.propertyKey === 13) {
            handlePositionX(keyframes, lottieObject, lottie);
        } else if (animatedProperty.propertyKey === 14) {
            handlePositionY(keyframes, lottieObject, lottie);
        } else if (animatedProperty.propertyKey === 15) {
            handleRotation(keyframes, lottieObject, lottie);
        } else if (animatedProperty.propertyKey === 16) {
            handleScaleX(keyframes, lottieObject, lottie);
        } else if (animatedProperty.propertyKey === 17) {
            handleScaleY(keyframes, lottieObject, lottie);
        } else if([24, 25, 82, 83, 84, 85, 86, 87].includes(animatedProperty.propertyKey)){
            handleShape(keyframes, lottieObject, objectId, animatedProperty.propertyKey);
        } else if([20, 21].includes(animatedProperty.propertyKey)){
            handleShapeSize(keyframes, lottieObject, animatedProperty.propertyKey);
        } else if (animatedProperty.propertyKey === 37) {
            handleColor(keyframes, lottieObject);
        } else if (animatedProperty.propertyKey === 47) {
            handleStrokeThickness(keyframes, lottieObject);
        } else if (animatedProperty.propertyKey === 18) {
            handleOpacity(keyframes, lottieObject);
        } else if (animatedProperty.propertyKey === 38) {
            handleColor(keyframes, lottieObject);
        } else if (animatedProperty.propertyKey === 39) {
            handleGradientStopPosition(keyframes, lottieObject);
        } else {
            console.log('propertyKey', animatedProperty.propertyKey)
        }
    })
}

const addAnimations = (lottieAnimations, artboard) => {
    const animations = artboard.animations;
    animations.forEach((animation, index) => {
        const lottie = lottieAnimations[index];
        const animatedObjects = animation.objects;
        animatedObjects.forEach(animatedObject => {
            const animatedProperties = animatedObject.keyedProperties;
            setAnimatedProperties(animatedProperties, animatedObject.id, lottie);
        })
    })
}


module.exports = addAnimations;