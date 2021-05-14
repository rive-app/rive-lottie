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

function createAnimations(project, riveFile) {
  return project.artboards
    .map((artboard) => createAnimationsFromArtboard(artboard, riveFile))
    .flat();
}

async function build(buffer) {
  try {
    await riveModule.loadModule();
    const riveFile = riveModule.load(new Uint8Array(buffer));
    const reader = new BinaryReader(buffer);
    validateHeader(reader);
    const project = new Project(reader);
    project.searchArtboards();
    const animations = createAnimations(project, riveFile);
    const animationsData = animations.map((animation) => animation.serialize());
    return animationsData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return [];
}

module.exports = build;
