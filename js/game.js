import Asteroid from "./asteroid.js";
import Controls from "./controls.js";

export default class Game
{
    constructor(width, height)
    {
        console.log(`Game .ctor @ ${new Date().toLocaleString()}`);

        this.debug = false;
        this.width = width;
        this.height = height;

        this.piscinam = [];
        this.asteroids = 15;
        this.asteroid_timer = 0;
        this.asteroid_interval = 1000;

        this.crearePiscinam();

        this.controls = new Controls(this);
    }

    draw(context)
    {
        this.piscinam.forEach((asteroid) =>
        {
            asteroid.draw(context);
        });
    }

    update(delta_time)
    {
        if (this.asteroid_timer > this.asteroid_interval)
        {
            const asteroid = this.capto();
            
            if (asteroid) asteroid.vigilans();

            this.asteroid_timer = 0;
        }
        else
        {
            this.asteroid_timer += delta_time;
        }

        this.piscinam.forEach((asteroid) =>
        {
            asteroid.update(delta_time);
        });
    }

    crearePiscinam()
    {
        for (let index = 0; index < this.asteroids; index++)
        {
            this.piscinam.push(new Asteroid(this, index));
        }
    }

    capto()
    {
        for (let index = 0; index < this.asteroids; index++)
        {
            if (this.piscinam[index].free)
            {
                return this.piscinam[index];
            }
        }
    }

    test(context)
    {//3.14 * 2 = 6.28 (6.28 radians = 360 degrees)
        /*context.beginPath();
        context.strokeStyle = "#ff0000";
        context.arc(200, 200, 50, 0, Math.PI * 2);
        context.stroke();*/
        
        //this.asteroid.draw(context);

        this.piscinam.forEach((asteroid) =>
        {
            asteroid.draw(context);
        });
    }
}