import { Choice } from "../model/Choice";
import { GameStatusVariation } from "../model/ChoiceOutcomeStatus";
import { EventOutcome } from "../model/EventOutcome";
import { GameEvent } from "../model/GameEvent";
import { Question } from "../model/Question";
import { ExitTheElevator } from "./ExitTheElevator";



export class StuckInTheElevator extends GameEvent {

    private static instance: StuckInTheElevator;

    private constructor() {
        super();
    }

    isRepetable: Boolean = false;

    question: Question = new Question(
        new Array(
            "Hey there, now you are stock in this elevator with this very good looking woman!",
            "Oh gosh, it seems like the elevator has stopped!",
            "Niceee, the elevator has stopped working....",
        ),
        new Array(
            new Choice(
                "Noice!",
                new EventOutcome(
                    null, // No changes
                    null, // No event objects
                    ExitTheElevator.getInstance(),
                ),
            ),
            new Choice(
                "Ouch! I have to go peeing!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, // anxietyVar
                        0 , // floorVar
                        0 , // airLevelVar
                        +1, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "Ouch! I have the restroom!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, // anxietyVar
                        0 , // floorVar
                        -1, // airLevelVar
                        +1, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "Oh gosh! I'm late for my appointment!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, // anxietyVar
                        0 , // floorVar 
                        0 , // airLevelVar
                        0 , // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I am sure it's going to re-start soon!",
                new EventOutcome(
                    new GameStatusVariation(
                        0 , // anxietyVar
                        0 , // floorVar
                        0 , // airLevelVar
                        0 , // cringeVar
                    ),
                ),
            ),
            new Choice(
                "Today it's not a good day",
                new EventOutcome(
                    new GameStatusVariation(
                        0 , // anxietyVar
                        0 , // floorVar
                        0 , // airLevelVar
                        0 , // cringeVar
                    ),
                ),
            ),
        ),
    )

    static getInstance() {
        if (!StuckInTheElevator.instance) {
            StuckInTheElevator.instance = new StuckInTheElevator();
        }
        return StuckInTheElevator.instance;
    }

}
