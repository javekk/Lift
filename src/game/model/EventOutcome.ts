import { GameStatusVariation } from "./ChoiceOutcomeStatus";
import { GameEvent } from "./GameEvent";
import { GameObject } from "./GameObject";


export class EventOutcome {
    constructor(
        public gameStatusVariation?: GameStatusVariation,
        public newGameObject?: GameObject,
        public nextEvent?: GameEvent,
    ){}
} 