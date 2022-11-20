
export class Question {
    constructor(
        public text: string,
        public choices: Set<Choice>,
    ){}
}

export class Choice {
    constructor(
        public text: string,
        public isCorrect: Boolean,
    ){}
}
