import { Choice } from "../model/Choice";
import { GameStatusVariation } from "../model/ChoiceOutcomeStatus";
import { EventOutcome } from "../model/EventOutcome";
import { GameEvent } from "../model/GameEvent";
import { GameStatus } from "../model/GameStatus";
import { Question } from "../model/Question";


export class SmallTalk1 extends GameEvent {

    private static instance: SmallTalk1;

    isRepetable: Boolean = true;

    private constructor() {
        super();
    }

    question: Question = new Question(
        new Array(
            "So, what your plan now, are you going to say something or what?"
        ),
        new Array(
            new Choice(
                "Yes, I am going to talk about the weather!",
                new EventOutcome(
                    new GameStatusVariation(
                        0, 0, 0, 0 
                    ),
                ),
            ),
            new Choice(
                "Better not to say anything!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, 0, 0, +1
                    ),
                ),
            ),
            new Choice(
                "Can't too nervous for speaking with girl!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, 0, -1, +1 
                    ),
                ),
            ),
            new Choice(
                "Sure maybe I can talk about my clinbing classes..",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, +1
                    ),
                ),
            )
        )
    )

    static getInstance() {
        if (!SmallTalk1.instance) {
            SmallTalk1.instance = new SmallTalk1();
        }
        return SmallTalk1.instance;
    }

    matchCondition(gameStatus: GameStatus): Boolean {
        return gameStatus.cringe < 5 
            && gameStatus.anxiety < 5 
            && gameStatus.airLevel > 1;
    }
}
