class Stoplight {
    constructor(x, y, greenImg, redImg) {
        this.x = x;
        this.y = y;
        this.greenImg = greenImg;
        this.redImg = redImg;
        this.currentImg = greenImg; // Start with the green stoplight
        this.size = 150;
        this.red = false;
        this.green = false;
    }

    display() {
        image(this.currentImg, this.x, this.y, 200, 150);
    }

    greenStoplight() {
        this.currentImg = this.greenImg;
        this.green = true;
        this.red = false;
    }

    redStoplight() {
        this.currentImg = this.redImg;
        this.red = true;
        this.green = false;
        // let incomingscooter = false;
        // let scooterbuf = 0;
    }
}
