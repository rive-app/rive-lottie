const LottieProperty = require('./LottieProperty');
const bezierEaser = require('../helpers/bezierEaser');

class LottieVertexProperty extends LottieProperty {
  constructor() {
    super();
    this._vertices = [];
    this._vertexKeyframes = {};
    this._value = {
      v: [],
      i: [],
      o: [],
      c: true,
    };
    this.vertexSolvers = {
      CubicAsymmetricVertex: this.getCubicAssymetricVertexValue.bind(this),
      CubicMirroredVertex: this.getCubicMirroredVertexValue.bind(this),
      StraightVertex: this.getStraightVertexValue.bind(this),
      CubicDetachedVertex: this.getCubicDetachedVertexValue.bind(this),
    };
  }

  get vertices() {
    return this._vertices;
  }

  get vertexKeyframes() {
    return this._vertexKeyframes;
  }

  getObjectById(id) {
    return this._vertices.find((vertex) => vertex.id === id) ? this : null;
  }

  set closed(val) {
    this._value.c = val;
  }

  addVertex(vertex) {
    this._vertices.push(vertex);
    this._value.v.push(vertex.v);
    this._value.i.push(vertex.i);
    this._value.o.push(vertex.o);
  }

  // eslint-disable-next-line class-methods-use-this
  validate() {
    // TODO: implement
    return true;
  }

  buildPropertiesKeyframes() {
    const objects = {};
    Object.keys(this._vertexKeyframes)
      .sort((a, b) => a - b)
      .forEach((keyframeIndex) => {
        const keyframeData = this._vertexKeyframes[keyframeIndex];
        // console.log('keyframeData', keyframeData)
        keyframeData.forEach((data) => {
          if (!objects[data.objectId]) {
            objects[data.objectId] = {};
          }
          if (!objects[data.objectId][data.propertyKey]) {
            objects[data.objectId][data.propertyKey] = [];
          }
          objects[data.objectId][data.propertyKey].push(data);
        });
      });
    return objects;
  }

  // eslint-disable-next-line class-methods-use-this
  getInterpolatedValue(frame, animationFrames) {
    if (frame < animationFrames[0].frame) {
      return animationFrames[0].value;
    } if (frame >= animationFrames[animationFrames.length - 1].frame) {
      return animationFrames[animationFrames.length - 1].value;
    }
    let prevFrame;
    let postFrame;
    let i = 0;
    while (i < animationFrames.length) {
      if (animationFrames[i].frame > frame) {
        prevFrame = animationFrames[i - 1];
        postFrame = animationFrames[i];
        break;
      }
      i += 1;
    }
    let interpolationFunction;
    if (prevFrame.interpolationType === 1) {
      interpolationFunction = bezierEaser.getBezierEasing(0, 0, 1, 1);
    } else {
      const { interpolator } = prevFrame;
      interpolationFunction = bezierEaser.getBezierEasing(
        interpolator.x1,
        interpolator.y1,
        interpolator.x2,
        interpolator.y2,
      );
    }
    const prePerc = (frame - prevFrame.frame) / (postFrame.frame - prevFrame.frame);
    const perc = interpolationFunction.get(prePerc);
    return prevFrame.value + (postFrame.value - prevFrame.value) * perc;
  }

  getCubicDetachedVertexValue(frame, value, animations) {
    const inRotation = animations && animations[84]
      ? this.getInterpolatedValue(frame, animations[84])
      : value.d.ir;
    const inDistance = animations && animations[85]
      ? this.getInterpolatedValue(frame, animations[85])
      : value.d.id;
    const outRotation = animations && animations[86]
      ? this.getInterpolatedValue(frame, animations[86])
      : value.d.or;
    const outDistance = animations && animations[87]
      ? this.getInterpolatedValue(frame, animations[87])
      : value.d.od;
    const x = animations && animations[24]
      ? this.getInterpolatedValue(frame, animations[24])
      : value.d.x;
    const y = animations && animations[25]
      ? this.getInterpolatedValue(frame, animations[25])
      : value.d.y;
    const iX = Math.cos(inRotation) * inDistance;
    const iY = Math.sin(inRotation) * inDistance;
    const oX = Math.cos(outRotation) * outDistance;
    const oY = Math.sin(outRotation) * outDistance;

    return {
      v: [x, y],
      i: [iX, iY],
      o: [oX, oY],
    };
  }

  getStraightVertexValue(frame, value, animations) {
    const vertex = {
      i: [0, 0],
      o: [0, 0],
      v: [value.d.x, value.d.y],
    };
    if (animations && animations[24]) {
      const animationFrames = animations[24];
      vertex.v[0] = this.getInterpolatedValue(frame, animationFrames);
    }
    if (animations && animations[25]) {
      const animationFrames = animations[25];
      vertex.v[1] = this.getInterpolatedValue(frame, animationFrames);
    }
    return vertex;
  }

  getCubicMirroredVertexValue(frame, value, animations) {
    const rotation = animations && animations[82]
      ? this.getInterpolatedValue(frame, animations[82])
      : value.d.r;
    const distance = animations && animations[83]
      ? this.getInterpolatedValue(frame, animations[83])
      : value.d.d;
    const x = animations && animations[24]
      ? this.getInterpolatedValue(frame, animations[24])
      : value.d.x;
    const y = animations && animations[25]
      ? this.getInterpolatedValue(frame, animations[25])
      : value.d.y;
    const iX = Math.cos(rotation + Math.PI) * distance;
    const iY = Math.sin(rotation + Math.PI) * distance;
    const oX = Math.cos(rotation) * distance;
    const oY = Math.sin(rotation) * distance;
    return {
      v: [x, y],
      i: [iX, iY],
      o: [oX, oY],
    };
  }

  getCubicAssymetricVertexValue(frame, value, animations) {
    const rotation = animations && animations[79]
      ? this.getInterpolatedValue(frame, animations[79])
      : value.d.r;
    const inDistance = animations && animations[80]
      ? this.getInterpolatedValue(frame, animations[80])
      : value.d.id;
    const outDistance = animations && animations[81]
      ? this.getInterpolatedValue(frame, animations[81])
      : value.d.od;
    const x = animations && animations[24]
      ? this.getInterpolatedValue(frame, animations[24])
      : value.d.x;
    const y = animations && animations[25]
      ? this.getInterpolatedValue(frame, animations[25])
      : value.d.y;
    const iX = Math.cos(rotation + Math.PI) * inDistance;
    const iY = Math.sin(rotation + Math.PI) * inDistance;
    const oX = Math.cos(rotation) * outDistance;
    const oY = Math.sin(rotation) * outDistance;
    return {
      v: [x, y],
      i: [iX, iY],
      o: [oX, oY],
    };
  }

  serialize() {
    const frameKeys = Object.keys(this._vertexKeyframes);
    if (frameKeys.length) {
      const frameRange = frameKeys
        .reduce((accumulator, frameNum) => {
          accumulator.maxFrame = Math.max(frameNum, accumulator.maxFrame);
          accumulator.minFrame = Math.min(frameNum, accumulator.minFrame);
          return accumulator;
        }, {
          maxFrame: -1,
          minFrame: 10000,
        });
      const objects = this.buildPropertiesKeyframes();
      let frame = frameRange.minFrame;
      const interpolatedVertexValues = [];
      while (frame < frameRange.maxFrame) {
        const vertexPoints = {
          v: [],
          i: [],
          o: [],
          c: this._value.c,
        };
        for (let i = 0; i < this._vertices.length; i += 1) {
          const vertex = this._vertices[i];
          const vertexValue = this.vertexSolvers[vertex.type](frame, vertex, objects[vertex.id]);
          vertexPoints.v.push(vertexValue.v);
          vertexPoints.i.push(vertexValue.i);
          vertexPoints.o.push(vertexValue.o);
        }
        interpolatedVertexValues.push({
          t: frame,
          s: [vertexPoints],
          i: { x: 0, y: 0 },
          o: { x: 1, y: 1 },
        });
        frame += 1;
      }
      return {
        a: 1,
        k: interpolatedVertexValues,
      };
    }
    const vertexPoints = {
      v: [],
      i: [],
      o: [],
      c: this._value.c,
    };
    this._vertices.forEach(
      (vertex) => {
        // console.log('vertex', vertex.type);
        const vertexValue = this.vertexSolvers[vertex.type](0, vertex, null);
        vertexPoints.v.push(vertexValue.v);
        vertexPoints.i.push(vertexValue.i);
        vertexPoints.o.push(vertexValue.o);
      },
    );
    return {
      a: 1,
      k: vertexPoints,
    };
  }
}

module.exports = LottieVertexProperty;
