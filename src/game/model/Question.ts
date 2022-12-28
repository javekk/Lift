import { Choice } from "./Choice";

export class Question {

    private maxChoiceNumber: number = 4;

    constructor(
        private questionTexts: Array<string>,
        private choices: Array<Choice>,
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

    getRandomQuestionText(): string {
        return this.questionTexts[Math.floor(Math.random() * this.questionTexts.length)];
    }

    getRandomFourChoices(): Array<Choice> {
        if(this.choices.length <  this.maxChoiceNumber)
            return this.choices; 
        return this.sample();
    }

    sample(): Array<Choice>{
        let oldValues = new Set<number>([]);
        let ret = new Array<Choice>();
        while(ret.length < this.maxChoiceNumber){
            var currentSample = Math.floor(Math.random() * this.choices.length);
            while(oldValues.has(currentSample)){
                currentSample = Math.floor(Math.random() * this.choices.length);
            }
            oldValues.add(currentSample);
            ret.push(this.choices[currentSample]);
        }
        return ret;
    }
}