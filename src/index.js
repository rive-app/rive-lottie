const BinaryReader = require('./BinaryReader');
const Project = require('./Project');
const Header = require('./Header');
const riveModule = require('./helpers/riveModule');

const createAnimationsFromArtboard = require('./converter/createAnimationsFromArtboard');

function validateHeader(reader) {
  const header = new Header(reader);
  header.parse();
  if (!header.valid) {
    throw new Error('Invalid signature');
  }
  return header;
}

function createAnimations(project) {
  return project.artboards
    .map((artboard) => createAnimationsFromArtboard(artboard))
    .flat();
}

async function build(buffer) {
  try {
    await riveModule.loadModule();
    const reader = new BinaryReader(buffer);
    validateHeader(reader);
    const project = new Project(reader);
    project.searchArtboards();
    const animations = createAnimations(project);
    const animationsData = animations.map((animation, index) => {
      const riveFile = riveModule.load(new Uint8Array(buffer));
      const artboard = riveFile.defaultArtboard();
      const riveAnimation = artboard.animationByIndex(index);
      const animationInstance = riveModule.loadLinearAnimation(riveAnimation);
      return animation.serialize({
        artboard,
        animation: animationInstance,
        frameRate: animation.frameRate,
      });
    });
    return animationsData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return [];
}

module.exports = build;
