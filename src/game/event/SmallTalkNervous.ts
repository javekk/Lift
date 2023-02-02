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
        return gameStatus.cringe >= 5 || gameStatus.anxiety >= 5;
    }

    question: Question = new Question(
        new Array(
            "Nervousness is perceived, what's syour plan man?",
            "Nervous vibes are perceived, what should we do?",
        ),
        new Array(

            new Choice(
                "I'm scared, I'll try to hide.",
                new EventOutcome(
                    new GameStatusVariation(
                        +1 , // anxietyVar
                        0  , // floorVar
                        0  , // airLevelVar
                        +3 , // cringeVar
                    ),
                ),
            ),
            new Choice(
                "I'll try to focus on my breathing and meditate.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, -1,
                    ),
                ),
            ),
            new Choice(
                "I'll keep myself with my book. Oh, no network...",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, 0, 0, 0, 
                    ),
                ),
            ),
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
                "Talk about the weather, usually it works!",
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
