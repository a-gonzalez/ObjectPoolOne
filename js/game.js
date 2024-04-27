import Asteroid from "./asteroid.js";
import Explosion from "./explosion.js";
import Click from "./click.js";
//import Controls from "./controls.js";

export default class Game
{
    constructor(width, height)
    {
        console.log(`Game .ctor @ ${new Date().toLocaleString()}`);

        this.debug = false;
        this.width = width;
        this.height = height;

        this.asteroids = [];
        this.asteroid_max = 15;
        this.asteroid_timer = 0;
        this.asteroid_interval = 1000;
        this.explosions = [];
        this.explosion_max = 10;

        // create object pools
        this.createAsteroidPool();
        this.createExplosionPool();

        this.click = new Click();

        //this.controls = new Controls(this);

        window.addEventListener("click", (event) =>
        {// full-screen we would use x and y properties
            this.click.x = event.offsetX;
            this.click.y = event.offsetY;

            //console.log(this.click);

            const explosion = this.getExplosionFromPool();

            if (explosion) explosion.wake(this.click.x, this.click.y);
        });
    }

    draw(context)
    {
        this.asteroids.forEach((asteroid) =>
        {
            asteroid.draw(context);
        });

        this.explosions.forEach((explosion) =>
        {
            explosion.draw(context);
        });
    }

    update(delta_time)
    {
        if (this.asteroid_timer > this.asteroid_interval)
        {
            const asteroid = this.getAsteroidFromPool();
            
            if (asteroid) asteroid.wake();

            this.asteroid_timer = 0;
        }
        else
        {
            this.asteroid_timer += delta_time;
        }

        this.asteroids.forEach((asteroid) =>
        {
            asteroid.update(delta_time);
        });

        this.explosions.forEach((explosion) =>
        {
            explosion.update(delta_time);
        });
    }

    createAsteroidPool()
    {
        for (let index = 0; index < this.asteroid_max; index++)
        {
            this.asteroids.push(new Asteroid(this, index));
        }
    }

    createExplosionPool()
    {
        for (let index = 0; index < this.explosion_max; index++)
        {
            this.explosions.push(new Explosion(this));
        }
    }

    getAsteroidFromPool()
    {
        for (let index = 0; index < this.asteroid_max; index++)
        {
            if (this.asteroids[index].free)
            {
                return this.asteroids[index];
            }
        }
    }

    getExplosionFromPool()
    {
        for (let index = 0; index < this.explosion_max; index++)
        {
            if (this.explosions[index].free)
            {
                return this.explosions[index];
            }
        }
    }

    isCollision(asteroid, click)
    {
        const radii = asteroid.radius + click.radius;
        const dx = asteroid.x - click.x;
        const dy = asteroid.y - click.y;

        //const distance = Math.sqrt(dx * dx + dy * dy);
        const distance = Math.hypot(dx, dy); // c2 = a2 + b2 (pathagoras theorem)

        // distance < sum-of-radii equals collision
        return distance < radii;
    }

    test(context)
    {//3.14 * 2 = 6.28 (6.28 radians = 360 degrees)
        /*context.beginPath();
        context.strokeStyle = "#ff0000";
        context.arc(200, 200, 50, 0, Math.PI * 2);
        context.stroke();*/
        
        //this.asteroid.draw(context);

        /*this.piscinam.forEach((asteroid) =>
        {
            asteroid.draw(context);
        });*/
        context.font = '20px Arial';
        context.textAlign = "center";
        context.fillStyle = "#ff1111";
        context.fillText(`Testing @ ${new Date().toLocaleString()}`, 300, 400);
    }
}