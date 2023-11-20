import { getMoveDownValue, getLandBlockVelocity } from './utils'
import * as constant from './constant'

export const lineAction = (instance, engine, time) => {
    // Simplified line movement (moving down)
    instance.y += 1;
  
    // Simplified horizontal movement
    instance.x += 2;
  };
  
  export const linePainter = (instance, engine) => {
    const { ctx } = engine;
  
    // Simplified line drawing
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(instance.x, instance.y);
    ctx.lineTo(instance.x + 50, instance.y); // Adjust the line length (e.g., 50 pixels)
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  