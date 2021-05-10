var Artboard = require('./Artboard');
var Backboard = require('./Backboard');
var Node = require('./Node');
var Shape = require('./Shape');
var Ellipse = require('./Ellipse');
var Polygon = require('./Polygon');
var Fill = require('./Fill');
var SolidColor = require('./SolidColor');
const LinearAnimation = require('./LinearAnimation');
const KeyedObject = require('./KeyedObject');
const KeyedProperty = require('./KeyedProperty');
const KeyframeDouble = require('./KeyframeDouble');
const Star = require('./Star');
const Stroke = require('./Stroke');
const Rectangle = require('./Rectangle');
const CubicInterpolator = require('./CubicInterpolator');
const ClippingShape = require('./ClippingShape');
const PointsPath = require('./PointsPath');
const StraightVertex = require('./StraightVertex');
const CubicMirroredVertex = require('./CubicMirroredVertex');
const CubicAsymmetricVertex = require('./CubicAsymmetricVertex');
const CubicDetachedVertex = require('./CubicDetachedVertex');
const KeyframeColor = require('./KeyframeColor');
const LinearGradient = require('./LinearGradient');
const RadialGradient = require('./RadialGradient');
const GradientStop = require('./GradientStop');
const TrimPath = require('./TrimPath');

class Project {

    constructor(reader) {
        this._reader = reader;
    }

    _artboards = [];
    _backboard = null;
    _reader = null;

    lastObjects = {

    }

    resolveArtboard() {
        if (this.lastObjects.artboard) {
            this.lastObjects.artboard.resolve();
        }
    }

    _createBackboard = (reader) => {
        this._backboard = Object.seal(new Backboard(reader));
    }

    _createArtboard = (reader) => {
        this.resolveArtboard();
        const artboard = Object.seal(new Artboard(reader));
        this._artboards.push(artboard);
        this.lastObjects.artboard = artboard;
    }

    _createNode = (reader) => {
        const node = Object.seal(new Node(reader));
        this.lastObjects.artboard.addChild(node);
    }

    _createShape = (reader) => {
        const shape = Object.seal(new Shape(reader));
        this.lastObjects.artboard.addChild(shape);
    }

    _createEllipse = (reader) => {
        const ellipse = Object.seal(new Ellipse(reader));
        this.lastObjects.artboard.addChild(ellipse);
    }

    _createPolygon = (reader) => {
        const polygon = Object.seal(new Polygon(reader));
        this.lastObjects.artboard.addChild(polygon);
    }

    _createStraightVertex = (reader) => {
        const straightVertex = Object.seal(new StraightVertex(reader));
        this.lastObjects.artboard.addChild(straightVertex);
    }

    _createRectangle = (reader) => {
        const rectangle = Object.seal(new Rectangle(reader));
        this.lastObjects.artboard.addChild(rectangle);
    }

    _createPointsPath = (reader) => {
        const pointsPath = Object.seal(new PointsPath(reader));
        this.lastObjects.artboard.addChild(pointsPath);
    }

    _createStar = (reader) => {
        const star = Object.seal(new Star(reader));
        this.lastObjects.artboard.addChild(star);
    }

    _createSolidColor = (reader) => {
        const solidColor = Object.seal(new SolidColor(reader));
        this.lastObjects.artboard.addChild(solidColor);
    }

    _createGradientStop = (reader) => {
        const gradientStop = Object.seal(new GradientStop(reader));
        this.lastObjects.artboard.addChild(gradientStop);
    }

    _createFill = (reader) => {
        const fill = Object.seal(new Fill(reader));
        this.lastObjects.artboard.addChild(fill);
    }

    _createLinearGradient = (reader) => {
        const linearGradient = Object.seal(new LinearGradient(reader));
        this.lastObjects.artboard.addChild(linearGradient);
    }

    _createRadialGradient = (reader) => {
        const radialGradient = Object.seal(new RadialGradient(reader));
        this.lastObjects.artboard.addChild(radialGradient);
    }

    _createStroke = (reader) => {
        const stroke = Object.seal(new Stroke(reader));
        this.lastObjects.artboard.addChild(stroke);
    }

    _createLinearAnimation = (reader) => {
        const linearAnimation = Object.seal(new LinearAnimation(reader));
        this.lastObjects.artboard.addAnimation(linearAnimation);
        this.lastObjects.linearAnimation = linearAnimation;
    }

    _createCubicMirroredVertex = (reader) => {
        const cubicMirroredVertex = Object.seal(new CubicMirroredVertex(reader));
        this.lastObjects.artboard.addChild(cubicMirroredVertex);
    }

    _createKeyframeColor = (reader) => {
        const keyframeColor = Object.seal(new KeyframeColor(reader));
        this.lastObjects.keyedProperty.addKeyframe(keyframeColor);
    }

    _createCubicAssymetricVertex = (reader) => {
        const cubicAssymetricVertex = Object.seal(new CubicAsymmetricVertex(reader));
        this.lastObjects.artboard.addChild(cubicAssymetricVertex);
    }

    _createCubicDetachedVertex = (reader) => {
        const cubicDetachedVertex = Object.seal(new CubicDetachedVertex(reader));
        this.lastObjects.artboard.addChild(cubicDetachedVertex);
    }

    _createKeyedObject = (reader) => {
        const keyedObject = Object.seal(new KeyedObject(reader));
        this.lastObjects.linearAnimation.addObject(keyedObject);
        this.lastObjects.keyedObject = keyedObject;
    }

    _createKeyedProperty = (reader) => {
        const keyedProperty = Object.seal(new KeyedProperty(reader));
        this.lastObjects.keyedObject.addProperty(keyedProperty);
        this.lastObjects.keyedProperty = keyedProperty;
    }

    _createKeyframeDouble = (reader) => {
        const keyframe = Object.seal(new KeyframeDouble(reader));
        this.lastObjects.keyedProperty.addKeyframe(keyframe);
    }

    _createCubicInterpolator = (reader) => {
        const interpolator = Object.seal(new CubicInterpolator(reader));
        this.lastObjects.artboard.addChild(interpolator);
    }

    _createClippingShape = (reader) => {
        const clippingShape = Object.seal(new ClippingShape(reader));

        this.lastObjects.artboard.addChild(clippingShape);
    }

    _createTrimPath = (reader) => {
        const trimPath = Object.seal(new TrimPath(reader));
        this.lastObjects.artboard.addChild(trimPath);
    }

    _objectFactories = {
        23: this._createBackboard,
        1: this._createArtboard,
        2: this._createNode,
        3: this._createShape,
        4: this._createEllipse,
        5: this._createStraightVertex,
        6: this._createCubicDetachedVertex,
        7: this._createRectangle,
        16: this._createPointsPath,
        17: this._createRadialGradient,
        18: this._createSolidColor,
        19: this._createGradientStop,
        20: this._createFill,
        22: this._createLinearGradient,
        24: this._createStroke,
        25: this._createKeyedObject,
        26: this._createKeyedProperty,
        28: this._createCubicInterpolator,
        30: this._createKeyframeDouble,
        31: this._createLinearAnimation,
        34: this._createCubicAssymetricVertex,
        35: this._createCubicMirroredVertex,
        37: this._createKeyframeColor,
        42: this._createClippingShape,
        47: this._createTrimPath,
        51: this._createPolygon,
        52: this._createStar,
    }

    searchArtboards() {
        const reader = this._reader;
        try {
            while (!reader.isEOF()) {
                const objectType = reader.readVarUint();
                if (this._objectFactories[objectType]) {
                    this._objectFactories[objectType](reader);
                } else if (objectType === 0) {
                    console.log('END OBJECT');
                } else {
                    console.log('INDEX objectType', objectType);
                }
            }
            this.resolveArtboard();
        } catch(err) {
            console.log(err)
        }
    }

    get artboards() {
        return this._artboards;
    }

}

module.exports = Project;