let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
context.font = 'bold 30px sans-serif';
let scrollCounter, cameraY, current, mode, xSpeed;
let ySpeed = 5;
let height = 50; // Adjust based on your image size
let blocks = [];
blocks[0] = {
    x: 300,
    y: 300,
    width: 200
};
let scrap = {
    x: 0,
    width: 0
};

let towerImage = new Image();
towerImage.src = 'block.png'; // Image path

towerImage.onload = function() {
    console.log("Image loaded successfully");
    restart();
    animate();
};

towerImage.onerror = function() {
    console.error("Error loading the image");
};

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

function animate() {
    // Set the background color to black
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (mode != 'gameOver') {
        context.font = 'bold 30px sans-serif';
        context.fillStyle = 'white'; // Set text color to white for visibility
        context.fillText('Score: ' + (current - 1).toString(), 100, 200);
        // Movement and collision logic
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

        // Drawing the blocks with the image
        for (let n = 0; n < blocks.length; n++) {
            let block = blocks[n];
            context.drawImage(towerImage, block.x, 600 - block.y + cameraY, block.width, height);
        }

        // Drawing the scrap with the image (if needed)
        if (scrap.width > 0) {
            context.drawImage(towerImage, scrap.x, 600 - scrap.y + cameraY, scrap.width, height);
        }
    }
    window.requestAnimationFrame(animate);
}
function restart() {
    blocks.splice(1, blocks.length - 1);
    mode = 'bounce';
    cameraY = 0;
    scrollCounter = 0;
    xSpeed = 2;
    current = 1;
    newBlocks();
    scrap.y = 0;
}

canvas.onpointerdown = function() {
    if (mode == 'gameOver')
        restart();
    else {
        if (mode == 'bounce')
            mode = 'fall';
    }
};

towerImage.onload = function() {
    restart();
    animate();
};
