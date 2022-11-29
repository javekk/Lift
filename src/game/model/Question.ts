import { Choice } from "./Choice";

export class Question {
    constructor(
        public text: string,
        public choices: Set<Choice>,
        public sprite?: Phaser.GameObjects.Sprite,
        public textSprite?: Phaser.GameObjects.Text,
    ){}

    destroySprite(){
        this.sprite.destroy();
        this.textSprite.destroy();
        Array.from(this.choices).map(choice => {
            choice.sprite.destroy();
            choice.textSprite.destroy();
        });
    }
}