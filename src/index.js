const BinaryReader = require('./BinaryReader');
const Project = require('./Project');
const Header = require('./Header');

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
    .map(createAnimationsFromArtboard)
    .flat();
}

function build(buffer) {
  try {
    const reader = new BinaryReader(buffer);
    validateHeader(reader);
    const project = new Project(reader);
    project.searchArtboards();
    const animations = createAnimations(project);
    const animationsData = animations.map((animation) => animation.serialize());
    return animationsData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return [];
}

module.exports = build;
