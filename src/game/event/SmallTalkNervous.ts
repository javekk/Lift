import { Choice } from "../model/Choice";
import { GameStatusVariation } from "../model/ChoiceOutcomeStatus";
import { EventOutcome } from "../model/EventOutcome";
import { GameEvent } from "../model/GameEvent";
import { GameStatus } from "../model/GameStatus";
import { Question } from "../model/Question";


export class SmallTalkNervous extends GameEvent {

    private static instance: SmallTalkNervous;

    isRepetable: Boolean = true;

    private constructor() {
        super();
    }

    matchCondition(gameStatus: GameStatus): Boolean {
        return gameStatus.cringe > 5 || gameStatus.anxiety > 5;
    }

    question: Question = new Question(
        new Array(
            "Nervousness is perceived, what's your plan man?",
            "Nervous vibes are perceived, what should we do?",
        ),
        new Array(
            new Choice(
                "Push the button for the first floor repetetly and see what happen",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, -1, 0, 0 
                    ),
                ),
            ),
            new Choice(
                "Oh man! I don't know",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, 0, -1, +1
                    ),
                ),
            ),
            new Choice(
                "The weather, usually it works!",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, -1, -1 
                    ),
                ),
            ),
            new Choice(
                "I like Satan",
                new EventOutcome(
                    new GameStatusVariation(
                        +4, 0, -1, +4
                    ),
                ),
            ),
            new Choice(
                "I really like Satan",
                new EventOutcome(
                    new GameStatusVariation(
                        +4, 0, -1, +4
                    ),
                ),
            ),
            new Choice(
                "Push random buttons and see what happen",
                new EventOutcome(
                    new GameStatusVariation(
                        +2, +1, -1, 0 
                    ),
                ),
            ),
        )
    )

    static getInstance() {
        if (!SmallTalkNervous.instance) {
            SmallTalkNervous.instance = new SmallTalkNervous();
        }
        return SmallTalkNervous.instance;
    }
}
