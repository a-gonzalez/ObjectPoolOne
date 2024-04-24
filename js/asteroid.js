export default class Asteroid
{
    constructor(game)
    {
        console.log(`Asteroid .tor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.width = 150;
        this.height = 155;
        this.radius = 75;
        this.speed = 0.5;
        this.free = true;
        //this.x = Math.random() * this.game.width;
        this.x = 0;
        this.y = Math.random() * this.game.height;

        this.image = new Image(this.width, this.height);
        this.image.src = "./img/asteroid.png";
    }

    draw(context)
    {
        if (!this.free)
        {
            context.beginPath();
            context.strokeStyle = "#ff1111";
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.stroke();

            context.drawImage(this.image, this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
        }
    }

    update(delta_time)
    {
        if (!this.free)
        {
            this.x += this.speed;

            if (this.x > this.game.width + this.width)
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
        this.x = 0;
        this.y = Math.random() * this.game.height;
    }
}