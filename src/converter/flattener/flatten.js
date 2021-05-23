const drawPath = (flatPath) => {
  const path = {
    i: [],
    o: [],
    v: [],
    c: true,
  };
  for (let j = 0; j < flatPath.length(); j += 1) {
    if (!flatPath.isCubic(j)) {
      path.i.push([0, 0]);
      path.o.push([0, 0]);
    } else {
      path.i.push([flatPath.inX(j) - flatPath.x(j), flatPath.inY(j) - flatPath.y(j)]);
      path.o.push([flatPath.outX(j) - flatPath.x(j), flatPath.outY(j) - flatPath.y(j)]);
    }
    path.v.push([flatPath.x(j), flatPath.y(j)]);
  }
  return path;
};

const flattenPaths = (rangeTimes, pathId, riveData) => {
  const shapeData = {
    ty: 'sh',
    ks: {

    },
  };
  const riveAnimation = riveData.animation;
  const riveArtboard = riveData.artboard;
  const { frameRate } = riveData;
  // Resetting advanced time from previous interpolation
  const currentTime = riveAnimation.time;
  riveAnimation.advance(-currentTime);
  riveArtboard.advance(-currentTime);
  //
  if (rangeTimes.length) {
    const initialTime = rangeTimes[0];
    const endTime = rangeTimes[rangeTimes.length - 1];
    const keyframes = [];
    riveAnimation.advance(initialTime / frameRate);
    riveArtboard.advance(initialTime / frameRate);
    for (let i = initialTime; i < endTime; i += 1) {
      riveAnimation.advance(1 / frameRate);
      riveAnimation.apply(riveArtboard, 1.0);
      riveArtboard.advance(1 / frameRate);
      const flatPath = riveArtboard.flattenPath(pathId, true);
      const path = drawPath(flatPath);
      keyframes.push({
        t: i,
        o: { x: 0, y: 0 },
        i: { x: 1, y: 1 },
        s: [path],
      });
    }
    shapeData.ks.a = 1;
    shapeData.ks.k = keyframes;
  } else {
    shapeData.ks.a = 0;
    riveAnimation.apply(riveArtboard, 1.0);
    const flatPath = riveArtboard.flattenPath(pathId, true);
    const path = drawPath(flatPath);
    shapeData.ks.k = path;
  }
  return shapeData;
};

module.exports = flattenPaths;
