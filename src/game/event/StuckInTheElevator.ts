import { Choice } from "../model/Choice";
import { ChoiceOutcomeStatus } from "../model/ChoiceOutcomeStatus";
import { EventOutcome } from "../model/EventOutcome";
import { GameEvent } from "../model/GameEvent";
import { Question } from "../model/Question";



export class StuckInTheElevator extends GameEvent {

    private static instance: StuckInTheElevator;

    private constructor() {
        super();
    }

    question: Question = new Question(
        "Hey there, now you are stock in this elevator with this very good looking woman!",
        new Set([
            new Choice(
                "Noice!",
                new EventOutcome(
                    new ChoiceOutcomeStatus(),
                ),
            ),
            new Choice(
                "Ouch! I have to go peeing",
                new EventOutcome(
                    new ChoiceOutcomeStatus(
                        +1, 0, 0 
                    ),
                ),
            ),
            new Choice(
                "Oh gosh! I'am late for my appointment!",
                new EventOutcome(
                    new ChoiceOutcomeStatus(
                        +1, 0, 0 
                    ),
                ),
            ),
            new Choice(
                "I am sure it's going to re-start soon!",
                new EventOutcome(
                    new ChoiceOutcomeStatus(
                        +1, 0, 0 
                    ),
                ),
            )
        ])
    )
    isRepetable: Boolean;

    static getInstance() {
        if (!StuckInTheElevator.instance) {
            StuckInTheElevator.instance = new StuckInTheElevator();
        }
        return StuckInTheElevator.instance;
    }

}
