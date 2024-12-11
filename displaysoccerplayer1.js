let idleImg;
let soccerPlayer;

function preload() {
    idleImg = loadImage('assets/idle.png'); // Load the idle animation image
}

function setup() {
    createCanvas(800, 600);
    soccerPlayer = new SoccerPlayer(width / 2, height / 2, idleImg, 100); // Initialize with size 100
}

function draw() {
    background(200);
    soccerPlayer.display();
}

class SoccerPlayer {
    constructor(x, y, img, size) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.size = size;
        this.frameWidth = img.width / 4; // Assuming 4 frames in a row
        this.frameHeight = img.height;
        this.currentFrame = 0;
        this.animationSpeed = 0.1; // Adjust the speed of the animation
        this.frameCount = 0;
    }

    display() {
        this.frameCount += this.animationSpeed;
        this.currentFrame = Math.floor(this.frameCount) % 4; // Loop through the 4 frames

        let sx = this.currentFrame * this.frameWidth;
        let sy = 0;

        image(this.img, this.x, this.y, this.size, this.size, sx, sy, this.frameWidth, this.frameHeight);
    }
}