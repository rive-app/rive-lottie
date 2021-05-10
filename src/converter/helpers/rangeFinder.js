const compareValues = (val1, val2) => JSON.stringify(val1) === JSON.stringify(val2);

const findInterpolatingProperty = (ranges, keyframeNumbers, currentRangeIndex, propertyIndex) => {
  let lowerIndex = currentRangeIndex;
  let upperIndex = currentRangeIndex + 1;
  let lowerKeyframeValue; let
    upperKeyframeValue;
  while (lowerIndex >= 0) {
    const keyframe = keyframeNumbers[ranges[lowerIndex]];
    const prop = keyframe.find((prop) => prop.propertyIndex === propertyIndex);
    if (prop) {
      lowerKeyframeValue = prop;
      break;
    }
    lowerIndex -= 1;
  }
  while (upperIndex <= ranges.length - 1) {
    const keyframe = keyframeNumbers[ranges[upperIndex]];
    const prop = keyframe.find((prop) => prop.propertyIndex === propertyIndex);
    if (prop) {
      upperKeyframeValue = prop;
      break;
    }
    upperIndex += 1;
  }
  if (!lowerKeyframeValue || !upperKeyframeValue) {
    return false;
  }

  return !(compareValues(lowerKeyframeValue.keyframe.s, upperKeyframeValue.keyframe.s));
};

const findMissingIndexes = (initKeyframeData, endKeyframeData, totalProperties) => Array
  .from(Array(totalProperties), (x, i) => i)
  .filter((index) => !(initKeyframeData.find((keyframeData) => keyframeData.propertyIndex === index)
                && endKeyframeData.find((keyframeData) => keyframeData.propertyIndex === index)));

const findInterpolatingProperties = (ranges, keyframeNumbers, currentRangeIndex, totalProperties) => {
  const initFrame = parseInt(ranges[currentRangeIndex]);
  const endFrame = parseInt(ranges[currentRangeIndex + 1]);
  const initKeyframeData = keyframeNumbers[initFrame];
  const endKeyframeData = keyframeNumbers[endFrame];
  const missingProperties = findMissingIndexes(initKeyframeData, endKeyframeData, totalProperties);
  for (let i = 0; i < missingProperties.length; i += 1) {
    if (findInterpolatingProperty(ranges, keyframeNumbers, currentRangeIndex, missingProperties[i])) {
      return true;
    }
  }

  return false;
};

const areInterpolationsEqual = (properties) => {
  const lastI = JSON.stringify(properties[0].keyframe.i);
  const lastO = JSON.stringify(properties[0].keyframe.o);
  for (let i = 1; i < properties.length; i += 1) {
    if (lastI !== JSON.stringify(properties[i].keyframe.i)
         || lastO !== JSON.stringify(properties[i].keyframe.o)
    ) {
      return false;
    }
  }
  return true;
};

const findRangesOnKeyframes = (properties, withEqualEasing = false) => {
  // Grouping all properties on a dictionary by keyframe time
  const keyframeNumbers = {};
  properties.forEach((propertyKeyframes, propertyIndex) => {
    for (let i = 0; i < propertyKeyframes.length; i += 1) {
      const keyframe = propertyKeyframes[i];
      if (!keyframeNumbers[keyframe.t]) {
        keyframeNumbers[keyframe.t] = [];
      }
      keyframeNumbers[keyframe.t].push({
        propertyIndex,
        keyframe,
      });
    }
  });
  const totalProperties = properties.length;
  // ranges contains all keyframe times of all properties sorted incrementally
  const ranges = Object.keys(keyframeNumbers)
    .sort((a, b) => a - b);
  const finalFrames = new Set();
  for (let i = 0; i < ranges.length - 1; i += 1) {
    const initFrame = parseInt(ranges[i]);
    const endFrame = parseInt(ranges[i + 1]);
    // if all properties are animated on the current range
    // and interpolations are independent or they are all equal
    // the range is full and can be added
    let isValidRange = false;
    if (!withEqualEasing || areInterpolationsEqual(keyframeNumbers[initFrame])) {
      if (keyframeNumbers[initFrame].length === keyframeNumbers[endFrame].length
                && keyframeNumbers[initFrame].length === totalProperties) {
        finalFrames.add(initFrame);
        finalFrames.add(endFrame);
        isValidRange = true;
        // if properties that don't have a keyframe in this range are not interpolated
        // the range can be added
      } else if (!findInterpolatingProperties(ranges, keyframeNumbers, i, totalProperties)) {
        finalFrames.add(initFrame);
        finalFrames.add(endFrame);
        isValidRange = true;
      }
    }
    if (!isValidRange) {
      let count = initFrame;
      while (count <= endFrame) {
        finalFrames.add(count);
        count += 1;
      }
    }
  }
  return finalFrames;
};

const rangeFinder = (properties, withEqualEasing = false) => {
  const keyframedProperties = properties
    .filter((property) => property.a === 1)
    .map((property) => property.k);
  return Array.from(findRangesOnKeyframes(keyframedProperties, withEqualEasing));
};

module.exports = rangeFinder;
