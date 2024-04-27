export default class Asteroid
{
    constructor(game, index)
    {
        console.log(`Asteroid .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.index = index;
        this.width = 150;
        this.height = 155;
        this.radius = 75;
        this.free = true;
        this.speed = Math.random() * 1.5 + 0.1; // 0.1 and 1.6 pixels per animation frame
        this.x = this.radius;
        this.y = Math.random() * this.game.height;
        this.angle = 0;
        this.va = Math.random() * 0.02 - 0.01;

        this.image = new Image(this.width, this.height);
        this.image.src = "img/asteroid.png";
    }

    draw(context)
    {
        if (!this.free)
        {
            if (this.game.debug)
            {
                context.beginPath();
                context.strokeStyle = "#00ff00";
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
            }
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, -this.width * 0.5, -this.height * 0.5, this.width, this.height);
            context.restore();

            if (this.game.debug)
            {
                context.font = '18px Arial';
                context.textAlign = "center";
                context.fillStyle = "#ffffff";
                context.fillText(`Designation: ${this.index}`, this.x, this.y - 20);
                context.fillText(`Speed: ${this.speed.toFixed(4)}`, this.x, this.y);
                context.fillText(`Angle: ${this.angle.toFixed(4)}`, this.x, this.y + 20);
                context.fillText(`X: ${this.x.toFixed(0)} Y: ${this.y.toFixed(0)}`, this.x, this.y + 40);
            }
        }
    }

    update(delta_time)
    {
        if (!this.free)
        {
            this.angle += this.va;
            this.x += this.speed;

            if (this.x > this.game.width - this.radius)
            {
                this.sleep();

                const explosion = this.game.getExplosionFromPool();

                if (explosion) explosion.wake(this.x, this.y, 0);
            }
        }
    }

    sleep()
    {
        this.free = true;
    }

    wake()
    {
        this.free = false;
        //this.x = 0;
        this.x = this.radius;
        this.y = Math.random() * this.game.height;
    }
}