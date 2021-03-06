const LottieShape = require('./LottieShape');
const fillFactory = require('./fillFactory');
const strokeFactory = require('./strokeFactory');
const LottieShapeGroup = require('./LottieShapeGroup');
const LottieShapeRectangle = require('./LottieShapeRectangle');
const LottieShapeEllipse = require('./LottieShapeEllipse');
const math = require('./helpers/math');
const layerProperties = require('./helpers/layerProperties');
const LottieShapePath = require('./LottieShapePath');
const LottieShapePolygon = require('./LottieShapePolygon');

const shapeTypes = {
  RECTANGLE: 'Rectangle',
  ELLIPSE: 'Ellipse',
  POLYGON: 'Polygon',
  STAR: 'Star',
  TRIANGLE: 'Triangle',
  FILL: 'Fill',
  STROKE: 'Stroke',
  SHAPE: 'Shape',
  POINTS_PATH: 'PointsPath',
  NODE: 'Node',
};

const lottiePaintTypes = {
  FILL: 'LottieFill',
  STROKE: 'LottieStroke',
  GRADIENT_FILL: 'LottieGradientFill',
  GRADIENT_STROKE: 'LottieGradientStroke',
};

const lottieModifiers = {
  TRIM_PATH: 'LottieShapeTrimPath',
};

const createShapeGroup = () => {
  const shapeGroup = Object.seal(new LottieShapeGroup());
  shapeGroup.transform.hasPositionSeparate = false;
  return shapeGroup;
};

const completeShapeGroup = (group, shape) => {
  group.addShape(shape);
};

const groupFactory = (shape) => {
  const lottieShapeGroup = createShapeGroup();
  lottieShapeGroup.shapeType = shape.type;
  lottieShapeGroup.id = shape.id;
  lottieShapeGroup.name = shape.name;
  const groupTransform = lottieShapeGroup.transform;
  groupTransform.scale.value = [math.toHundred(shape.scaleX), math.toHundred(shape.scaleY)];
  groupTransform.rotation.value = math.radsToDegs(shape.rotation);
  groupTransform.x.value = shape.x;
  groupTransform.y.value = shape.y;
  return lottieShapeGroup;
};

const createRectangle = (rectangle) => {
  const lottieShapeGroup = groupFactory(rectangle);
  const lottieRectangle = new LottieShapeRectangle();
  lottieRectangle.position.x.value = rectangle.originx;
  lottieRectangle.position.y.value = rectangle.originy;
  lottieRectangle.size.x.value = rectangle.width;
  lottieRectangle.size.y.value = rectangle.height;
  lottieRectangle.roundness.value = rectangle.cornerRadius;
  completeShapeGroup(lottieShapeGroup, lottieRectangle);
  return lottieShapeGroup;
};

const createEllipse = (ellipse) => {
  const lottieShapeGroup = groupFactory(ellipse);
  const lottieEllipse = new LottieShapeEllipse();
  lottieEllipse.position.x.value = ellipse.originx;
  lottieEllipse.position.y.value = ellipse.originy;
  lottieEllipse.size.x.value = ellipse.width;
  lottieEllipse.size.y.value = ellipse.height;
  completeShapeGroup(lottieShapeGroup, lottieEllipse);
  return lottieShapeGroup;
};

const createPolygon = (polygon) => {
  const lottieShapeGroup = groupFactory(polygon);
  const lottiePolygon = new LottieShapePolygon();
  lottiePolygon.position.x.value = polygon.originx;
  lottiePolygon.position.y.value = polygon.originy;
  lottiePolygon.size.x.value = polygon.width;
  lottiePolygon.size.y.value = polygon.height;
  lottiePolygon.points.value = polygon.points ? polygon.points : 0;
  lottiePolygon.roundness.value = polygon.cornerRadius ? polygon.cornerRadius : 0;
  completeShapeGroup(lottieShapeGroup, lottiePolygon);
  return lottieShapeGroup;
};

const createStar = (star) => {
  const lottieShapeGroup = createPolygon(star);
  const lottieStar = lottieShapeGroup.getShapeAt(0);
  lottieStar.innerRadius.value = star.innerRadius;
  lottieStar.polygonType = LottieShapePolygon.polygonTypes.STAR;
  return lottieShapeGroup;
};

const createTriangle = (triangle) => {
  const lottieShapeGroup = createPolygon(triangle);
  const lottieTriangle = lottieShapeGroup.getShapeAt(0);
  lottieTriangle.points.value = 3;
  return lottieShapeGroup;
};

const createPointsPath = (pointsPath) => {
  const lottieShapeGroup = groupFactory(pointsPath);
  const lottieShapePath = new LottieShapePath();
  lottieShapePath.closed = pointsPath.isClosed;
  pointsPath.children.forEach((child) => {
    let vertex;
    if (child.type === 'StraightVertex') {
      vertex = {
        d: {
          x: child.x,
          y: child.y,
        },
      };
    } else if (child.type === 'CubicMirroredVertex') {
      vertex = {
        d: {
          x: child.x,
          y: child.y,
          d: child.distance,
          r: child.rotation,
        },
      };
    } else if (child.type === 'CubicAsymmetricVertex') {
      vertex = {
        d: {
          x: child.x,
          y: child.y,
          od: child.outDistance,
          id: child.inDistance,
          r: child.rotation,
        },
      };
    } else if (child.type === 'CubicDetachedVertex') {
      vertex = {
        d: {
          x: child.x,
          y: child.y,
          od: child.outDistance,
          id: child.inDistance,
          or: child.outRotation,
          ir: child.inRotation,
        },
      };
    }
    if (vertex) {
      vertex.id = child.id;
      vertex.type = child.type;
      lottieShapePath.addVertex(vertex);
    }
  });
  completeShapeGroup(lottieShapeGroup, lottieShapePath);
  return lottieShapeGroup;
};

const shapeCreators = {
  [shapeTypes.RECTANGLE]: createRectangle,
  [shapeTypes.ELLIPSE]: createEllipse,
  [shapeTypes.POLYGON]: createPolygon,
  [shapeTypes.STAR]: createStar,
  [shapeTypes.TRIANGLE]: createTriangle,
  [shapeTypes.POINTS_PATH]: createPointsPath,
  [shapeTypes.FILL]: fillFactory,
  [shapeTypes.STROKE]: strokeFactory,
  [shapeTypes.SHAPE]: groupFactory,
  [shapeTypes.NODE]: groupFactory,
};

const childrenShapes = [
  shapeTypes.RECTANGLE,
  shapeTypes.ELLIPSE,
  shapeTypes.POINTS_PATH,
  shapeTypes.POLYGON,
  shapeTypes.STAR,
  shapeTypes.TRIANGLE,
];

const childrenNodes = [
  shapeTypes.SHAPE,
  shapeTypes.NODE,
];

const createShapeFromElement = (element) => {
  if (shapeCreators[element.type]) {
    return Object.seal(shapeCreators[element.type](element));
  }
  return null;
};

const iterateChildren = (children, lottieGroup) => {
  children.forEach((child) => {
    const shapeChild = createShapeFromElement(child);

    if (childrenShapes.includes(child.type) || childrenNodes.includes(child.type)) {
      shapeChild.name = child.name;
      lottieGroup.addShape(shapeChild);
      //
    } else if (shapeChild) {
      shapeChild
        .filter((shape) => shape)
        .forEach((shape) => {
          const lastIndex = lottieGroup.getLastIndexType(
            [
              ...Object.values(lottiePaintTypes),
              ...Object.values(lottieModifiers),
            ],
          );
          lottieGroup.addShapeAt(shape, lastIndex);
        });
    }
    iterateChildren(child.children, shapeChild);
  });
};

// Looks for painting operations on shapes belonging to a group
const groupHasPaint = (group) => {
  const { shapes } = group;
  if (shapes) {
    for (let i = 0; i < shapes.length; i += 1) {
      const shape = shapes[i];
      if (Object.values(lottiePaintTypes).includes(shape.type)) {
        return true;
      }
    }
  }
  return false;
};

// Searches the closest parent group that has a painting operation applied to it
const getLastShapePaint = (_shape) => {
  let shape = _shape;
  while (shape.parent) {
    if (groupHasPaint(shape.parent)) {
      return shape.parent;
    }
    shape = shape.parent;
  }
  return null;
};

// This method traverses a lottieShape and children and splits tree into multiple branches
// when there is a painting operation nested inside another painting operation
const splitPaints = (lottieShape) => {
  let newPaint = false;
  const lastShapePaint = getLastShapePaint(lottieShape);
  // If the group has a paint operation and there is a paint operation upwards
  // it will split the tree at the parent paint operation (lastShapePaint)
  if (groupHasPaint(lottieShape) && lastShapePaint) {
    const parenting = [lottieShape];
    let found = false;
    let parent = lottieShape;
    // Creating new parent tree upwards
    while (!found) {
      parent = parent.parent;
      const lottieGroup = createShapeGroup();
      lottieGroup.transform = parent.transform;
      parenting.unshift(lottieGroup);
      if (parent === lastShapePaint) {
        found = true;
      }
    }
    parenting.unshift(lastShapePaint.parent);

    // Nesting shape in new tree downwards
    for (let i = 0; i < parenting.length - 1; i += 1) {
      parent = parenting[i];
      parent.addShape(parenting[i + 1]);
    }
    newPaint = true;
  } else {
    const { shapes } = lottieShape;
    if (shapes) {
      let i = 0;
      while (i < shapes.length) {
        const shape = shapes[i];
        const hasSplit = splitPaints(shape);
        if (hasSplit) {
          lottieShape.removeShapeAt(i);
        } else {
          i += 1;
        }
      }
    }
  }

  return newPaint;
};

// Looks for trim paths indexes on shapes belonging to a group
const searchTrimPathsIndexes = (group) => {
  const { shapes } = group;
  if (shapes) {
    const indexes = shapes
      .map((shape, index) => (Object.values(lottieModifiers).includes(shape.type) ? index : -1))
      .filter((index) => index !== -1);
    return indexes;
  }
  return [];
};

// Looks for trim paths indexes on shapes belonging to a group
const searchPaintIndexes = (group) => {
  const { shapes } = group;
  if (shapes) {
    const indexes = shapes
      .map((shape, index) => (Object.values(lottiePaintTypes).includes(shape.type) ? index : -1))
      .filter((index) => index !== -1);
    return indexes;
  }
  return [];
};

const getNonPaintShapes = (group) => {
  const { shapes } = group;
  if (shapes) {
    const paintShapeTypes = [
      ...Object.values(lottiePaintTypes),
      ...Object.values(lottieModifiers),
    ];
    return shapes
      .filter((shape) => !paintShapeTypes.includes(shape.type));
  }
  return [];
};

// Search for trim path operations and split the tree
// to avoid a trim path affecting fills or other trim paths
const splitTrimPaths = (lottieShape) => {
  const trimPathIndexes = searchTrimPathsIndexes(lottieShape);
  if (trimPathIndexes.length) {
    const paintIndexes = searchPaintIndexes(lottieShape);
    const nonPaintShapes = getNonPaintShapes(lottieShape);
    const { shapes } = lottieShape;
    lottieShape.clearShapes();
    let i = 0;
    while (i < paintIndexes.length) {
      const lottieGroup = createShapeGroup();
      lottieGroup.addShapes(nonPaintShapes);
      lottieGroup.addShape(shapes[paintIndexes[i]]);
      if (trimPathIndexes.includes(paintIndexes[i] - 1)) {
        lottieGroup.addShape(shapes[paintIndexes[i] - 1]);
      }
      lottieShape.addShape(lottieGroup);
      i += 1;
    }
  } else {
    const { shapes } = lottieShape;
    if (shapes) {
      let i = 0;
      while (i < shapes.length) {
        const shape = shapes[i];
        splitTrimPaths(shape);
        i += 1;
      }
    }
  }
};

const shapeFactory = (shape, parentId) => {
  const lottieShape = new LottieShape(shape.id);
  lottieShape.parentId = parentId;
  const lottieGroup = createShapeGroup();
  lottieGroup.name = shape.name;
  lottieShape.addShape(lottieGroup);
  layerProperties(lottieShape, shape);
  iterateChildren(shape.children, lottieGroup);
  splitPaints(lottieShape);
  splitTrimPaths(lottieShape);
  return [lottieShape];
};

module.exports = shapeFactory;
