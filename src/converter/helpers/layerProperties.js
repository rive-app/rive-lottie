const math = require('./math');

const layerProperties = (lottie, rive) => {
    const lottieTransform = lottie.transform;
    // if parentId is 0, it's the artboard
    if (rive.parentId) {
        lottie.parentId = rive.parentId;
    }
    lottieTransform.opacity.value = math.toHundred(rive.opacity);
    lottieTransform.scale.value = [math.toHundred(rive.scaleX), math.toHundred(rive.scaleY)];
    lottieTransform.rotation.value = math.radsToDegs(rive.rotation);
    lottieTransform.x.value = rive.x;
    lottieTransform.y.value = rive.y;
}

module.exports = layerProperties;