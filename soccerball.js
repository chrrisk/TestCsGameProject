class SoccerBall {
    constructor(x, y, size, img) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.img = img; // Store the image passed in
        this.speed = 6.5;
        this.angle = 0;
        this.moving = false;
        this.targetX = x;
    }

    move() {
        if (this.moving) {
            // Move towards the target position
            if (this.x < this.targetX) {
                this.x += this.speed;
                if (this.x >= this.targetX) {
                    this.x = this.targetX;
                    this.moving = false;
                }
            } else if (this.x > this.targetX) {
                this.x -= this.speed;
                if (this.x <= this.targetX) {
                    this.x = this.targetX;
                    this.moving = false;
                }
            }
        }
    }

    display() {
        if (this.img) {
            push();
            translate(this.x, this.y);
            rotate(this.angle);
            imageMode(CENTER);
            image(this.img, -10, 0, this.size, this.size);
            pop();
        }
    }

    startMoving() {
        this.moving = true;
    }

    stopMoving() {
        this.moving = false;
    }

    getBallPosition() {
        return {
            x: this.x,
            y: this.y,
            size: this.size
        };
    }

    resetBall() {
        this.x = -30;
        this.y = 575;
        this.stopMoving();
    }

    kickToOtherSide() {
        // Set the target position to the opposite side of the canvas with a 15-pixel grace area
        if (this.x < width) {
            this.targetX = (width + 100) - this.size / 2;
        } else if (this.x == this.targetX) {
            this.resetBall;
        }
        this.startMoving();
    }
}