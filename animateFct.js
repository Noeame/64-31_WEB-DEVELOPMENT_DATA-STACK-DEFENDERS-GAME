// animateFct.js
function newBlocks() {
    blocks[current] = {
        x: 0,
        y: (current + 10) * height,
        width: blocks[current - 1].width
    };
}

function gameOver() {
    mode = 'gameOver';
    context.fillText('Game over!', 50, 50);
}

function handleMovementAndCollision() {
    if (mode == 'bounce') {
        blocks[current].x += xSpeed;
        if (xSpeed > 0 && blocks[current].x + blocks[current].width > canvas.width)
            xSpeed = -xSpeed;
        if (xSpeed < 0 && blocks[current].x < 0)
            xSpeed = -xSpeed;
    }
    if (mode == 'fall') {
        blocks[current].y -= ySpeed;
        if (blocks[current].y <= blocks[current - 1].y + height) {
            mode = 'bounce';
            handleFallCollision();
            current++;
            scrollCounter = height;
            newBlocks();
        }
    }
    scrap.y -= ySpeed;
    if (scrollCounter) {
        cameraY++;
        scrollCounter--;
    }
}

function handleBounceCollision() {
    // Add any specific logic for the bounce collision if needed
}

function handleFallCollision() {
    let difference = blocks[current].x - blocks[current - 1].x;
    if (Math.abs(difference) >= blocks[current].width) {
        gameOver();
    }
    scrap = {
        y: blocks[current].y,
        width: difference
    };
    if (blocks[current].x > blocks[current - 1].x) {
        blocks[current].width -= difference;
        scrap.x = blocks[current].x + blocks[current].width;
    } else {
        scrap.x = blocks[current].x - difference;
        blocks[current].width += difference;
        blocks[current].x = blocks[current - 1].x;
    }
    if (xSpeed > 0)
        xSpeed++;
    else
        xSpeed--;
}

function drawBlocks() {
    context.fillStyle = 'lime';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'lucida';
    context.fillStyle = 'black';
    context.fillText('Score: ' + (current - 1).toString(), 100, 200);

    for (let n = 0; n < blocks.length; n++) {
        let block = blocks[n];
        context.drawImage(towerImage, block.x, 600 - block.y + cameraY, block.width, height);
    }
}

function drawScrap() {
    if (scrap.width > 0) {
        context.drawImage(towerImage, scrap.x, 600 - scrap.y + cameraY, scrap.width, height);
    }
}

function animate() {
    drawBlocks();
    handleMovementAndCollision();
    drawScrap();
    window.requestAnimationFrame(animate);
}

export {
    newBlocks,
    gameOver,
    handleMovementAndCollision,
    handleBounceCollision,
    handleFallCollision,
    drawBlocks,
    drawScrap,
    animate,
    restart
};
