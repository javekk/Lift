import { Choice } from "./Choice";

export class Question {
    constructor(
        public text: string,
        public choices: Set<Choice>,
    ){}
}