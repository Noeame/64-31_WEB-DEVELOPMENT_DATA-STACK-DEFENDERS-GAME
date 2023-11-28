    
const clouds = ['c1.png', 'c2.png', 'c3.png'];
const randomImg = array => (array[Math.floor(Math.random() * array.length)]);
imgName = randomImg(clouds);
let cloudImage = new Image();
cloudImage.src = imgName;
const maxFailed = 3
let failedCount = maxFailed;

    
let canvas = document.getElementById("myCanvas");
const audio = document.getElementById("audio");
const eltRestart = document.getElementById("divRestart");
let context = canvas.getContext("2d");
context.font = 'bold 30px sans-serif';

let heartImg = new Image();
heartImg.src = "heart.png" ;
const heartWidth = heartImg.width;
const heartHeight = heartImg.height*0.8;
const zoomedHeartWidth = canvas.width * 0.06;
const zoomedHeartHeight = (heartHeight * zoomedHeartWidth) / heartWidth;
    
    

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
    let cloudTab = [];


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

//new
        cloudTab[current] = {
            x : -100 ,
            y: 0,
            width: blocks[current - 1].width
        };

    }

    function gameOver() {
        mode = 'gameOver';
        // context.font = 'fantasy';
        // context.fillStyle = 'red'; 
         context.fillText('Game over!', 0, 0);
         audio.pause();
         eltRestart.style.display = 'block';
     
    }

     //new 

    function showHeart(){
        for (let i = 1; i <= failedCount; i += 1) {
            context.drawImage(
                heartImg,
                (canvas.width * 0.57) + ((i + 2.3*(3-i)) * zoomedHeartWidth),
                5,zoomedHeartWidth+10,zoomedHeartHeight);
          }
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
            context.fillText('Score: ' + (current - 1).toString(), 10, 40);




//new 
        showHeart();


            // Movement and collision logic
            if (mode == 'bounce') {
                blocks[current].x += xSpeed;
                ropes[current].x += xSpeed;
                cloudTab[current].x += xSpeed*0.4;
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
                        failedCount--;
                    
                        if(failedCount == 0){
                            gameOver();
                        }
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


//new 

            cloudTab.forEach(cloud => {
                context.drawImage(cloudImage,cloud.x,0,canvas.width* 0.2, canvas.height* 0.3);
               });
       


            // Drawing the blocks with the image
            for (let n = 0; n < blocks.length; n++) {
                let block = blocks[n];
                context.drawImage(towerImage, block.x, 600 - block.y + cameraY, block.width, height* 1.30);
            }

            // Drawing the scrap with the image (if needed)
            if (scrap.width > 0) {
                context.drawImage(towerImage, scrap.x, 600 - scrap.y + cameraY, scrap.width, height);
            }

            window.requestAnimationFrame(animate);
        }
    }

    function restart() {
        failedCount = maxFailed;
        blocks.splice(1, blocks.length - 1);
        ropes.splice(1, ropes.length - 1);
        cloudTab.splice(1, cloudTab.length - 1);
        mode = 'bounce';
        cameraY = 0;
        scrollCounter = 0;
        xSpeed = 2;
        current = 1;
        newBlocks();
        scrap.y = 0;
        audio.volume = 0.2;
        showHeart();
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
