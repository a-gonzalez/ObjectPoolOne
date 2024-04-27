export default class Explosion
{
    constructor(game)
    {
        console.log(`Explosion .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.width = 300;
        this.height = 300;
        this.free = true;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 3);
        this.frame_max = 22;
        this.animation_timer = 0;
        this.animation_interval = 1000 / 30;

        this.image = document.getElementById("explosions");
    }

    draw(context)
    {
        if (!this.free)
        {
            context.drawImage(this.image, this.width * this.frame_x, this.height * this.frame_y, this.width, this.height, this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
        }
    }

    update(delta_time)
    {
        if (!this.free)
        {
            if (this.animation_timer > this.animation_interval)
            {
                this.frame_x++;

                if (this.frame_x > this.frame_max) this.sleep();

                this.animation_timer = 0;
            }
            else
            {
                this.animation_timer += delta_time;
            }
        }
    }

    sleep()
    {
        this.free = true;
    }

    wake(x, y)
    {
        this.free = false;
        this.x = x;
        this.y = y;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 3);
    }
}