export default class Controls
{
    constructor(game)
    {
        console.log(`Controls .ctor @ ${new Date().toLocaleString()}`);

        this.game = game;
        this.keys = [];

        window.addEventListener("keydown", (event) =>
        {
            if ((event.key === "ArrowUp"
                || event.key === "ArrowDown"
                || event.key === "ArrowRight"
                || event.key === "ArrowLeft")
                && this.keys.indexOf(event.key) === -1)
            {
                //this.game.claves.push(event.key);
                this.keys.push(event.key);
            }
            else if (event.key === "d")
            {
                this.game.debug = !this.game.debug;
            }
            else if (event.key === "r")
            {
                window.location.reload();
            }
            /*else if (event.key === " ")
            { // attack
                
            }
            else if (event.key === "s")
            {
                this.game.sound = !this.game.sound;

                if (this.game.sound)
                {
                    this.game.background.sound.volume = 0.3;
                    this.game.background.sound.play();
                    this.game.background.sound.loop = true;
                }
                else
                {
                    this.game.background.sound.pause();
                }
            }
            else if (event.key === "x")
            {
                this.game.game_over = true;
            }*/
            
        });

        window.addEventListener("keyup", (event) =>
        {
            /*if (this.game.claves.indexOf(event.key) > -1)
            {
                this.game.claves.splice(this.game.claves.indexOf(event.key), 1);
            }*/
            this.keys.splice(this.keys.indexOf(event.key), 1);
        });
    }
}