const LottieLayer = require('./LottieLayer');

class LottiePreComp extends LottieLayer {
  constructor(id, width, height) {
    super(id);
    this._layers = [];
    this._width = width;
    this._height = height;
  }

  addLayer(layer) {
    // eslint-disable-next-line no-param-reassign
    layer.parentPreComp = this;
    this._layers.push(layer);
  }

  getLayerById(id) {
    let layer = null;
    for (let i = 0; i < this._layers.length; i += 1) {
      layer = this._layers[i].getObjectById(id);
      if (layer) {
        break;
      }
    }
    return layer;
  }

  getObjectById(id) {
    return super.getObjectById(id) || this.getLayerById(id);
  }

  serialize() {
    const refId = `comp_${LottiePreComp.refIdCount}`;
    LottiePreComp.refIdCount += 1;
    const preCompLayer = {
      ty: 0,
      ddd: 0,
      sr: 1,
      refId,
      w: this._width,
      h: this._height,
      ...super.serialize(),
    };
    return {
      assets: [
        {
          id: refId,
          layers: this._layers.map((layer) => layer.serialize()),
        },
      ],
      layers: [
        preCompLayer,
      ],
    };
  }
}

LottiePreComp.refIdCount = 0;

module.exports = LottiePreComp;
