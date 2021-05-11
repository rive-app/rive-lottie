const LottieShapeContent = require('./LottieShapeContent');
const LottieNumberProperty = require('./properties/LottieNumberProperty');
const { rgbaToVector } = require('../helpers/color');
const rangeFinder = require('./helpers/rangeFinder');
const bezierEaser = require('./helpers/bezierEaser');

class LottieGradientFill extends LottieShapeContent {
  constructor() {
    super();
    this._startX = new LottieNumberProperty(0);
    this._startY = new LottieNumberProperty(0);
    this._endX = new LottieNumberProperty(0);
    this._endY = new LottieNumberProperty(0);
    this._opacity = new LottieNumberProperty(0);
    this._gradientType = 'linear';
    this._stops = [];
  }

  get startX() {
    return this._startX;
  }

  get startY() {
    return this._startY;
  }

  get endX() {
    return this._endX;
  }

  get endY() {
    return this._endY;
  }

  get opacity() {
    return this._opacity;
  }

  set gradientType(val) {
    this._gradientType = val;
  }

  addStop(stop) {
    this._stops.push(stop);
  }

  getStopById(id) {
    return this._stops.find((stop) => stop.id === id);
  }

  getShapeById(id) {
    return super.getShapeById(id) || this.getStopById(id);
  }

  // eslint-disable-next-line class-methods-use-this
  addValueToProperties(value, colors, alphas) {
    const color = rgbaToVector(value);
    colors.push(color[0], color[1], color[2]);
    alphas.push(color[3] * 0.01);
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
    if (Array.isArray(prevKey.s)) {
      return prevKey.s.map((value, index) => value + (nextKey.s[index] - value) * perc);
    } if (typeof (prevKey.s) === 'object') {
      const newObj = {};
      Object.values(prevKey.s).forEach((s) => {
        newObj[s] = prevKey.s[s] + (nextKey.s[s] - prevKey.s[s]) * perc;
      });
      return newObj;
    }
    return prevKey.s + (nextKey.s - prevKey.s) * perc;
  }

  serialize() {
    const startX = this._startX.serialize();
    const startY = this._startY.serialize();
    const endX = this._endX.serialize();
    const endY = this._endY.serialize();

    const serializedStops = this._stops
      .map((stop) => stop.serialize())
      .sort((a, b) => a.p.k - b.p.k);

    const properties = serializedStops.map((stop) => [stop.p, stop.c]).flat();
    const rangeTimes = rangeFinder(properties, true);
    let stops;
    if (!rangeTimes.length) {
      const colors = [];
      const alphas = [];
      for (let i = 0; i < properties.length; i += 1) {
        const isEven = i % 2;
        if (!isEven) {
          colors.push(properties[i].k);
          alphas.push(properties[i].k);
        } else {
          this.addValueToProperties(properties[i].k, colors, alphas);
        }
      }
      stops = {
        a: 0,
        k: [...colors, ...alphas],
      };
    } else {
      const keyframes = [];
      for (let i = 0; i < rangeTimes.length; i += 1) {
        const time = rangeTimes[i];
        const keyframe = {
          t: time,
          s: [],
          o: { x: 0, y: 0 },
          i: { x: 1, y: 1 },
        };
        const colors = [];
        const alphas = [];

        for (let j = 0; j < properties.length; j += 1) {
          const isEven = j % 2;
          if (properties[j].a === 0) {
            if (!isEven) {
              colors.push(properties[j].k);
              alphas.push(properties[j].k);
            } else {
              this.addValueToProperties(properties[j].k, colors, alphas);
            }
          } else {
            const property = properties[j].k;
            for (let k = 0; k < property.length - 1; k += 1) {
              const propertyKeyframe = property[k];
              const propertyNextKeyframe = property[k + 1];
              if (time <= propertyKeyframe.t) {
                if (!isEven) {
                  colors.push(propertyKeyframe.s[0]);
                  alphas.push(propertyKeyframe.s[0]);
                } else {
                  this.addValueToProperties(propertyKeyframe.s, colors, alphas);
                }
                keyframe.o.x = propertyKeyframe.o.x;
                keyframe.o.y = propertyKeyframe.o.y;
                keyframe.i.x = propertyKeyframe.i.x;
                keyframe.i.y = propertyKeyframe.i.y;
                break;
              } else if (time <= propertyNextKeyframe.t) {
                const value = this.findInterpolatedValue(
                  propertyKeyframe,
                  propertyNextKeyframe,
                  time,
                );
                if (!isEven) {
                  colors.push(value[0]);
                  alphas.push(value[0]);
                } else {
                  this.addValueToProperties(value, colors, alphas);
                }
                break;
              } else if (time >= propertyNextKeyframe.t && k === property.length - 2) {
                if (!isEven) {
                  colors.push(propertyNextKeyframe.s[0]);
                  alphas.push(propertyNextKeyframe.s[0]);
                } else {
                  this.addValueToProperties(propertyNextKeyframe.s, colors, alphas);
                }
                break;
              }
            }
          }
        }
        keyframe.s = [...alphas, ...colors];
        keyframes.push(keyframe);
      }
      stops = {
        a: 1,
        k: keyframes,
      };
    }

    return {
      ty: 'gf',
      o: this._opacity.serialize(),
      bm: 0, // TODO: blend mode implement,
      t: this._gradientType === 'linear' ? 1 : 2,
      g: {
        p: this._stops.length,
        k: stops,
      },
      s: {
        a: 0,
        k: [
          startX.k,
          startY.k,
        ],
      },
      e: {
        a: 0,
        k: [
          endX.k,
          endY.k,
        ],
      },
      h: {
        a: 0,
        k: 0,
      },
      a: {
        a: 0,
        k: 0,
      },
    };
  }
}

module.exports = LottieGradientFill;
