let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
context.font = 'bold 30px sans-serif';

// Set background image
let backgroundImage = new Image();
backgroundImage.src = 'background.png';

// Ensure the background image is loaded before starting the animation
backgroundImage.onload = function () {
    // Start the animation loop after the background image is loaded
    restart();  // Start the game logic
    animate();  // Start the animation loop
};

let scrollCounter, cameraY, current, mode, xSpeed;
let ySpeed = 5;
let height = 50; // Adjust based on your image size
let blocks = [];
let ropes = [];
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

towerImage.onload = function () {
    console.log("Image loaded successfully");
};

towerImage.onerror = function () {
    console.error("Error loading the image");
};

function newBlocks() {
    blocks[current] = {
        x: 0,
        y: (current + 10) * height,
        width: blocks[current - 1].width
    };

    ropes[current] = {
        x: blocks[current].x + blocks[current].width / 2,
        y: 0,
        length: canvas.height - blocks[current].y  // Adjust the length of the rope
    };
}

function gameOver() {
    mode = 'gameOver';
    context.fillText('Game over!', 50, 50);
}

function backgroundLinearGradient() {
    const grad = context.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#FF9666'); // Adjust gradient colors as needed
    grad.addColorStop(1, '#8E5B54');
    context.fillStyle = grad;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function backgroundImg() {
    const bgWidth = backgroundImage.width;
    const bgHeight = backgroundImage.height;
    const zoomedHeight = (bgHeight * canvas.width) / bgWidth;
    let offsetHeight = canvas.height - zoomedHeight + cameraY;

    if (offsetHeight > canvas.height) {
        offsetHeight = canvas.height;
    }

    // Draw the moving background image
    context.drawImage(backgroundImage, 0, offsetHeight, canvas.width, zoomedHeight);
}

function animate() {
    // Draw the background first
    backgroundLinearGradient();
    backgroundImg();

    if (mode != 'gameOver') {
        context.font = 'fantasy';
        context.fillStyle = 'white'; // Set text color to white for visibility
        context.fillText('Score: ' + (current - 1).toString(), 100, 200);

        // Movement and collision logic
        if (mode == 'bounce') {
            blocks[current].x += xSpeed;
            ropes[current].x += xSpeed;

            if (xSpeed > 0 && blocks[current].x + blocks[current].width > canvas.width) {
                xSpeed = -xSpeed;
            }

            if (xSpeed < 0 && blocks[current].x < 0) {
                xSpeed = -xSpeed;
            }
        }

        if (mode == 'fall') {
            blocks[current].y -= ySpeed;
            ropes[current].y -= ySpeed;

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

                if (xSpeed > 0) {
                    xSpeed++;
                } else {
                    xSpeed--;
                }

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

        // Drawing the ropes from the ceiling to the blocks
        context.fillStyle = '#FFFF';
        ropes.forEach(rope => {
            context.fillRect(rope.x, rope.y, 2, rope.length);
        });

        // Drawing the blocks with the image
        for (let n = 0; n < blocks.length; n++) {
            let block = blocks[n];
            context.drawImage(towerImage, block.x, 600 - block.y + cameraY, block.width, height* 1.35);
        }

        // Drawing the scrap with the image (if needed)
        if (scrap.width > 0) {
            context.drawImage(towerImage, scrap.x, 600 - scrap.y + cameraY, scrap.width, height);
        }

        window.requestAnimationFrame(animate);
    }
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

canvas.onpointerdown = function () {
    if (mode == 'gameOver') {
        restart();
    } else {
        if (mode == 'bounce') {
            mode = 'fall';
        }
    }
};
