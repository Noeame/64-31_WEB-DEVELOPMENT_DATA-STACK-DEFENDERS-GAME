let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
context.font = 'bold 30px sans-serif';
let scrollCounter, cameraY, current, mode, xSpeed;
let ySpeed = 5;
let height = 50;
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
    if (mode != 'gameOver') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText('Score: ' + (current - 1).toString(), 100, 200);
        for (let n = 0; n < blocks.length; n++) {
            let block = blocks[n];
            // Use primary colors (red, blue, yellow)
            if (n % 3 === 0) {
                context.fillStyle = 'red';
            } else if (n % 3 === 1) {
                context.fillStyle = 'blue';
            } else {
                context.fillStyle = 'yellow';
            }
            context.fillRect(block.x, 600 - block.y + cameraY, block.width, height);
        }
        context.fillStyle = 'red';
        context.fillRect(scrap.x, 600 - scrap.y + cameraY, scrap.width, height);
        if (mode == 'bounce') {
            blocks[current].x = blocks[current].x + xSpeed;
            if (xSpeed > 0 && blocks[current].x + blocks[current].width > canvas.width)
                xSpeed = -xSpeed;
            if (xSpeed < 0 && blocks[current].x < 0)
                xSpeed = -xSpeed;
        }
        if (mode == 'fall') {
            blocks[current].y = blocks[current].y - ySpeed;
            if (blocks[current].y == blocks[current - 1].y + height) {
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
                    blocks[current].width = blocks[current].width - difference;
                    scrap.x = blocks[current].x + blocks[current].width;
                } else {
                    scrap.x = blocks[current].x - difference;
                    blocks[current].width = blocks[current].width + difference;
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
        scrap.y = scrap.y - ySpeed;
        if (scrollCounter) {
            cameraY++;
            scrollCounter--;
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

restart();
animate();
