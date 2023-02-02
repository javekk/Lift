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
            "Hey there, now you're stuck in this elevator with this very good-looking woman!",
            "Oh gosh, it seems like the elevator has come to a stop!",
            "Nice, the elevator has stopped working...",
            "Wow, you're stuck in this elevator with a stranger and it's getting c.",
            "Uh oh, it looks like the elevator has come to a halt. Just your luck.",
            "Great, just what you needed - a breakdown in this tiny elevator.",
            "Uh oh, it looks like the elevator is stuck!",
            "Well this is awkward, you are stuck in an elevator with a stranger.",
            "Great, just your luck to get stuck in an elevator.",
            "Stuck in an elevator, just what you needed to make my day even worse.",
            "This elevator better start moving soon, you don't do well in small spaces.",
        ),
        new Array(
            new Choice(
                "Ouch! I have to go peeing!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        +1, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "Ouch! I have to go to the restroom!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, // anxietyVar
                        0, // floorVar
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
                        0, // floorVar 
                        0, // airLevelVar
                        0, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I am sure it's going to re-start soon!",
                new EventOutcome(
                    new GameStatusVariation(
                        0, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        0, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "Today it's not a good day",
                new EventOutcome(
                    new GameStatusVariation(
                        0, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        0, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "Better not to say anything!",
                new EventOutcome(
                    new GameStatusVariation(
                        0, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        +1, // cringeVar
                    ),
                )
            ),
            new Choice(
                "Yes, I am going to talk about the weather!",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        -1, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I have to pee really bad, but I'll try to calm down and breathe.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        0, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I'll try to make small talk with the stranger.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        -1, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I'll try to start a conversation with the stranger.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, // anxietyVar
                        0 , // floorVar
                        0 , // airLevelVar
                        -1, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I'll try to stay quiet and avoid interaction.",
                new EventOutcome(
                    new GameStatusVariation(
                        0, // anxietyVar
                        0, // floorVar
                        0, // airLevelVar
                        +1, // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I'll try to focus on my breathing and meditate.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1 , // anxietyVar
                        0 , // floorVar
                        0 , // airLevelVar
                        -1 , // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I'll keep myself with my phone. Oh, no network...",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, // anxietyVar
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
