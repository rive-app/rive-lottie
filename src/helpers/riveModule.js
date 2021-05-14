/* eslint-disable */
const Rive = require('./riveParser');

let riveModule

const loadModule = async () => {
    riveModule = await Rive();
    const NoOpRenderPath = riveModule.RenderPath.extend('NoOpRenderPath', {
        __construct: function __construct() {
            this.__parent.__construct.call(this);
        },
        reset: function reset() {},
        addPath: function addPath(path, matrix) {},
        fillRule: function fillRule(fillRule) {},
        moveTo: function moveTo(x, y) {},
        lineTo: function lineTo(x, y) {},
        cubicTo: function cubicTo(ox, oy, ix, iy, x, y) {},
        close: function close() {},
    });
    NoOpRenderPaint = riveModule.RenderPaint.extend('NoOpRenderPaint', {
        color: function color(value) {},
        thickness: function thickness(value) {},
        join: function join(value) {},
        cap: function cap(value) {},
        style: function style(value) {},
        blendMode: function blendMode(value) {},
        linearGradient: function linearGradient(sx, sy, ex, ey) {},
        radialGradient: function radialGradient(sx, sy, ex, ey) {},
        addStop: function addStop(color, stop) {},
        completeGradient: function completeGradient() {},
        draw: function draw(ctx, path) {}
    });
    riveModule.renderFactory = {
        makeRenderPaint: () => new NoOpRenderPaint(),
        makeRenderPath: () => new NoOpRenderPath(),
    };
    return riveModule;
}

const load = (buffer) => {
  return riveModule ? riveModule.load(buffer) : null;
}

const loadLinearAnimation = (animation) => {
  return riveModule ? new riveModule.LinearAnimationInstance(animation) : null;
}

module.exports = {
  loadModule,
  load,
  loadLinearAnimation,
}