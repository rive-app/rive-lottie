const flattenPaths = (lottieAnimations, artboard, riveFile) => {
  lottieAnimations.forEach((animation) => {
    // TODO: get the correct artboard and animation
    const riveArtboard = riveFile.defaultArtboard();
    const riveAnimation = riveArtboard.animationByIndex(0);
    animation.layers.forEach((layer) => {
        if (layer.type === 'LottieShape') {
            layer.flattenUnexportableShapes(riveArtboard, riveAnimation);
        }
    });
  });
//   console.log(lottieAnimations.length);
//   console.log('artboard', artboard);
//   console.log('riveFile', riveFile);
};

module.exports = flattenPaths;
