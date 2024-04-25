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
        //this.speed = 0.5;
        this.free = true;
        this.speed = Math.random() * 1.5 + 0.1; // 0.1 and 1.6 pixels per animation frame
        //this.x = Math.random() * this.game.width;
        //this.x = 0;
        this.x = this.radius;
        this.y = Math.random() * this.game.height;

        this.image = new Image(this.width, this.height);
        this.image.src = "./img/asteroid.png";
    }

    draw(context)
    {
        if (!this.free)
        {
            if (this.game.debug)
            {
                context.beginPath();
                context.strokeStyle = "#ff1111";
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.stroke();
            }
            context.drawImage(this.image, this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);

            if (this.game.debug)
            {
                context.font = '20px Arial';
                context.textAlign = "center";
                context.fillStyle = "#ff1111";
                context.fillText(`Index: ${this.index}`, this.x, this.y);
                context.fillText(`Speed: ${this.speed.toFixed(4)}`, this.x, this.y + 20);
            }
        }
    }

    update(delta_time)
    {
        if (!this.free)
        {
            this.x += this.speed;

            if (this.x > this.game.width + this.radius)
            {
                this.sonno();
            }
        }
    }

    sonno()
    {
        this.free = true;
    }

    vigilans()
    {
        this.free = false;
        //this.x = 0;
        this.x = this.radius;
        this.y = Math.random() * this.game.height;
    }
}