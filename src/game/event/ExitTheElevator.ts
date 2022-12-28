import { Choice } from "../model/Choice";
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

    isRepetable: Boolean = false;

    question: Question = new Question(
        new Array(
            "You finally free, gg!"
        ),
        new Array(
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
        )
    )

    static getInstance() {
        if (!ExitTheElevator.instance) {
            ExitTheElevator.instance = new ExitTheElevator();
        }
        return ExitTheElevator.instance;
    }

}
