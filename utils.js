// Import constants for better readability
import * as constant from './constant';

// Function to check if the hook should move down
export const checkMoveDown = engine =>
  (engine.checkTimeMovement(constant.moveDownMovement));

// Function to get the value for moving down
export const getMoveDownValue = (engine, store) => {
  const pixelsPerFrame = store ? store.pixelsPerFrame : engine.pixelsPerFrame.bind(engine);
  const calHeight = engine.getVariable(constant.blockHeight) * 2;
  return pixelsPerFrame(calHeight);
};

// Function to get the base angle for the hook
export const getAngleBase = (engine) => {
  const { hookAngle } = engine.getVariable(constant.gameUserOption);
  if (hookAngle) {
    return hookAngle();
  }
  // Default angle if no custom hookAngle function is provided
  if (engine.getVariable(constant.hardMode)) {
    return 90;
  }
  return 30;
};



// Function to get the velocity of the swing block (now constant)
export const getSwingBlockVelocity = () => 1; // Adjust the value as needed








// Function to get the velocity of the swing block
//export const getSwingBlockVelocity = (engine, time) => {
  //const { hookSpeed } = engine.getVariable(constant.gameUserOption);
  //if (hookSpeed) {
    //return hookSpeed();
  //}
  // Default hard value for swing block velocity
  //let hard = 0;
  //if (engine.getVariable(constant.hardMode)) {
    //hard = 1.1;
  //}
  //return Math.sin(time / (200 / hard));
//};

// Function to get the velocity of the land block
export const getLandBlockVelocity = (engine, time) => {
  const { width } = engine;
  const { landBlockSpeed } = engine.getVariable(constant.gameUserOption);
  if (landBlockSpeed) {
    return landBlockSpeed();
  }
  // Default hard value for land block velocity
  let hard = 0;
  return Math.cos(time / 200) * hard * width;
};

// Function to get the status of the hook
export const getHookStatus = (engine) => {
  if (engine.checkTimeMovement(constant.hookDownMovement)) {
    return constant.hookDown;
  }
  if (engine.checkTimeMovement(constant.hookUpMovement)) {
    return constant.hookUp;
  }
  return constant.hookNormal;
};

// Function to handle touch events related to the hook
export const touchEventHandler = (engine) => {
  if (!engine.getVariable(constant.gameStartNow)) return;
  if (engine.debug && engine.paused) {
    return;
  }
  // Check if the hook status is normal before handling touch events
  if (getHookStatus(engine) !== constant.hookNormal) {
    return;
  }
  // Remove tutorial instances if present



  
};

// Function to add score based on success and perfection
export const addScore = (engine, isPerfect) => {
  const { setGameScore, successScore, perfectScore } = engine.getVariable(constant.gameUserOption);
  const lastPerfectCount = engine.getVariable(constant.perfectCount, 0);
  const lastGameScore = engine.getVariable(constant.gameScore);
  const perfect = isPerfect ? lastPerfectCount + 1 : 0;
  // Calculate and set the new score
  const score = lastGameScore + (successScore || 25) + ((perfectScore || 25) * perfect);
  engine.setVariable(constant.gameScore, score);
  engine.setVariable(constant.perfectCount, perfect);
  // If a setGameScore function is provided, update the external score
  if (setGameScore) setGameScore(score);
};

// Function to draw a stylized string on the canvas
export const drawYellowString = (engine, option) => {
  const {
    string, size, x, y, textAlign, fontName = 'wenxue', fontWeight = 'normal'
  } = option;
  const { ctx } = engine;
  const fontSize = size;
  const lineSize = fontSize * 0.1;
  ctx.save();
  ctx.beginPath();
  // Create a gradient for the text
  const gradient = ctx.createLinearGradient(0, 0, 0, y);
  gradient.addColorStop(0, '#FAD961');
  gradient.addColorStop(1, '#F76B1C');
  // Apply styles and draw the text
  ctx.fillStyle = gradient;
  ctx.lineWidth = lineSize;
  ctx.strokeStyle = '#FFF';
  ctx.textAlign = textAlign || 'center';
  ctx.font = `${fontWeight} ${fontSize}px ${fontName}`;
  ctx.strokeText(string, x, y);
  ctx.fillText(string, x, y);
  ctx.restore();
};
