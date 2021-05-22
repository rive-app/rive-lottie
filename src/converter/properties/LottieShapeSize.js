const LottieNumberProperty = require('./LottieNumberProperty');
const bezierEaser = require('../helpers/bezierEaser');
const rangeFinder = require('../helpers/rangeFinder');

class LottieShapeSize {
  constructor() {
    this._x = new LottieNumberProperty();
    this._y = new LottieNumberProperty();
  }

  get animated() {
    return this._x.animated || this._y.animated;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  // eslint-disable-next-line class-methods-use-this
  findInterpolatedValue(prevKey, nextKey, time) {
    const interpolationFunction = bezierEaser.getBezierEasing(
      prevKey.o.x,
      prevKey.o.y,
      prevKey.i.x,
      prevKey.i.y,
    );
    const prePerc = (time - prevKey.t) / (nextKey.t - prevKey.t);
    const perc = interpolationFunction.get(prePerc);
    // console.log('time', time);
    // console.log('prevKey', prevKey.t);
    // console.log('nextKey', nextKey.t);
    return prevKey.s[0] + (nextKey.s[0] - prevKey.s[0]) * perc;
  }

  serializeRanges(properties) {
    const rangeTimes = rangeFinder(properties);
    if (!rangeTimes.length) {
      return {
        a: 0,
        k: properties.map((property) => property.k),
      };
    }
    const keyframes = [];
    for (let i = 0; i < rangeTimes.length; i += 1) {
      const time = rangeTimes[i];
      const keyframe = {
        t: time,
        s: [],
        o: { x: [], y: [] },
        i: { x: [], y: [] },
      };

      for (let j = 0; j < properties.length; j += 1) {
        if (properties[j].a === 0) {
          keyframe.s.push(properties[j].k);
          keyframe.o.x.push(0);
          keyframe.o.y.push(0);
          keyframe.i.x.push(1);
          keyframe.i.y.push(1);
        } else {
          const property = properties[j].k;
          for (let k = 0; k < property.length - 1; k += 1) {
            const propertyKeyframe = property[k];
            const propertyNextKeyframe = property[k + 1];
            if (time <= propertyKeyframe.t) {
              keyframe.s.push(propertyKeyframe.s[0]);
              keyframe.o.x.push(propertyKeyframe.o.x);
              keyframe.o.y.push(propertyKeyframe.o.y);
              keyframe.i.x.push(propertyKeyframe.i.x);
              keyframe.i.y.push(propertyKeyframe.i.y);
              break;
            } else if (time <= propertyNextKeyframe.t) {
              keyframe.s.push(this.findInterpolatedValue(
                propertyKeyframe,
                propertyNextKeyframe,
                time,
              ));
              keyframe.o.x.push(0);
              keyframe.o.y.push(0);
              keyframe.i.x.push(1);
              keyframe.i.y.push(1);
              break;
            } else if (time >= propertyNextKeyframe.t && k === property.length - 2) {
              keyframe.s.push(propertyNextKeyframe.s[0]);
              break;
            }
            // console.log(keyframe);
          }
        }
      }
      keyframes.push(keyframe);
    }
    return {
      a: 1,
      k: keyframes,
    };
  }

  serialize() {
    const xValues = this._x.serialize();
    const yValues = this._y.serialize();
    const value = this.serializeRanges([xValues, yValues]);
    return value;
  }
}

module.exports = LottieShapeSize;
