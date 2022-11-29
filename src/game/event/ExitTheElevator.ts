import { Choice } from "../model/Choice";
import { GameStatusVariation } from "../model/ChoiceOutcomeStatus";
import { EventOutcome } from "../model/EventOutcome";
import { GameEvent } from "../model/GameEvent";
import { Question } from "../model/Question";
import { Exit } from "./app/Exit";
import { Restart } from "./app/Restart";


export class ExitTheElevator extends GameEvent {

    private static instance: ExitTheElevator;

    private constructor() {
        super();
    }

    question: Question = new Question(
        "You finally free, gg!",
        new Set([
            new Choice(
                "Try another time!",
                new EventOutcome(
                    null,
                    null,
                    new Restart(),
                ),
            ),
            new Choice(
                "Exit",
                new EventOutcome(
                    null,
                    null,
                    new Exit(),
                ),
            ),
        ])
    )
    isRepetable: Boolean = false;

    static getInstance() {
        if (!ExitTheElevator.instance) {
            ExitTheElevator.instance = new ExitTheElevator();
        }
        return ExitTheElevator.instance;
    }

}
