import { EventOutcome } from "./EventOutcome";

export class Choice {
    public sprite: Phaser.GameObjects.Sprite
    public textSprite: Phaser.GameObjects.Text
    constructor(
        public text: string,
        public changes: EventOutcome,
    ){}

    destroySprite(){

        if(this.sprite && this.textSprite){
            this.sprite.destroy();
            this.textSprite.destroy();
        }
    }
}
