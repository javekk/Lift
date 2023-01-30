import { Choice } from "../model/Choice";
import { GameStatusVariation } from "../model/ChoiceOutcomeStatus";
import { EventOutcome } from "../model/EventOutcome";
import { GameEvent } from "../model/GameEvent";
import { GameStatus } from "../model/GameStatus";
import { Question } from "../model/Question";


export class SmallTalkQuiet extends GameEvent {

    private static instance: SmallTalkQuiet;

    isRepetable: Boolean = true;

    private constructor() {
        super();
    }

    matchCondition(gameStatus: GameStatus): Boolean {
        return gameStatus.cringe < 3 
            && gameStatus.anxiety < 3 
            && gameStatus.airLevel >= 1;
    }

    question: Question = new Question(
        new Array(
            "So, what your plan now, are you going to say something or what?",
            "In the meanwhile you could say somenthing.....",
            "Maybe you can say something...",
        ),
        new Array(
            new Choice(
                "Yes, I am going to talk about the weather!",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, 0 
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
                "Can't! too nervous for speaking with girl!",
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
            ),
            new Choice(
                "I may talk about baird-watching, my fellow birdwacthers always say that girls like it..",
                new EventOutcome(
                    new GameStatusVariation(
                        0, 0, 0, +3
                    ),
                ),
            ),
        )
    )

    static getInstance() {
        if (!SmallTalkQuiet.instance) {
            SmallTalkQuiet.instance = new SmallTalkQuiet();
        }
        return SmallTalkQuiet.instance;
    }

}
