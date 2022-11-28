import { ChoiceOutcomeStatus } from "./ChoiceOutcomeStatus";
import { GameObject } from "./GameObject";
import { GameStatus } from "./GameStatus";


export class EventOutcome {
    constructor(
        public choiceOutcomeStatus?: ChoiceOutcomeStatus,
        public gameObject?: GameObject,
    ){}
}