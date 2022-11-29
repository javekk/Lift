import { EventOutcome } from "./EventOutcome";

export class Choice {
    public sprite: Phaser.GameObjects.Sprite
    public textSprite: Phaser.GameObjects.Text
    constructor(
        public text: string,
        public changes: EventOutcome,
    ){}
}
