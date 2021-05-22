const flattenPaths = (rangeTimes, pathId, riveData) => {
  const riveAnimation = riveData.animation;
  const riveArtboard = riveData.artboard;
  const { frameRate } = riveData;
  const initialTime = rangeTimes[0];
  const endTime = rangeTimes[rangeTimes.length - 1];
  const keyframes = [];
  // Resetting advanced time from previous interpolation
  const currentTime = riveAnimation.time;
  riveAnimation.advance(-currentTime);
  riveArtboard.advance(-currentTime);
  //
  riveAnimation.advance(initialTime);
  riveArtboard.advance(initialTime);
  for (let i = initialTime; i < endTime; i += 1) {
    riveAnimation.advance(1 / frameRate);
    riveAnimation.apply(riveArtboard, 1.0);
    riveArtboard.advance(1 / frameRate);
    const flatPath = riveArtboard.flattenPath(pathId, true);
    const path = {
      i: [],
      o: [],
      v: [],
      c: true,
    };
    for (let j = 0; j < flatPath.length(); j += 1) {
      path.i.push([flatPath.inX(j) - flatPath.x(j), flatPath.inY(j) - flatPath.y(j)]);
      path.o.push([flatPath.outX(j) - flatPath.x(j), flatPath.outY(j) - flatPath.y(j)]);
      path.v.push([flatPath.x(j), flatPath.y(j)]);
    }
    keyframes.push({
      t: i,
      o: { x: 0, y: 0 },
      i: { x: 1, y: 1 },
      s: [path],
    });
  }
  return {
    ty: 'sh',
    ks: {
      a: 1,
      k: keyframes,
    },
  };
};

module.exports = flattenPaths;
