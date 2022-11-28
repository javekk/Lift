import { EventOutcome } from "./EventOutcome";

export class Choice {
    constructor(
        public text: string,
        public changes: EventOutcome,
    ){}
}
