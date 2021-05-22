class LottieAnimation {
  constructor(width = 0, height = 0) {
    this._width = width;
    this._height = height;
    this._inPoint = 0;
    this._outPoint = 200;
    this._version = '5.7.8';
    this._layers = [];
    this._frameRate = 60;
  }

  set frameRate(value) {
    this._frameRate = value;
  }

  set inPoint(value) {
    this._inPoint = value;
  }

  set outPoint(value) {
    this._outPoint = value;
  }

  get layers() {
    return this._layers;
  }

  addLayer(layer) {
    this._layers.push(layer);
  }

  getObjectById(id) {
    let object = null;
    for (let i = 0; i < this._layers.length; i += 1) {
      object = this._layers[i].getObjectById(id);
      if (object) {
        break;
      }
    }
    return object;
  }

  serializeLayers() {
    return this._layers.reduce((accumulator, layer) => {
      const layerData = layer.serialize();
      if (layerData.assets) {
        accumulator.assets = [
          ...accumulator.assets,
          ...(layerData.assets || []),
        ];
        accumulator.layers = [
          ...accumulator.layers,
          ...(layerData.layers || []),
        ];
      } else {
        accumulator.layers.push(layerData);
      }
      return accumulator;
    }, {
      assets: [],
      layers: [],
    });
  }

  serialize() {
    return {
      w: this._width,
      h: this._height,
      v: this._version,
      ip: this._inPoint,
      op: this._outPoint,
      fr: this._frameRate,
      ddd: 0,
      ...this.serializeLayers(),
    };
  }
}

module.exports = LottieAnimation;
