import { Choice } from "../model/Choice";
import { GameStatusVariation } from "../model/ChoiceStatusVariation";
import { EventOutcome } from "../model/EventOutcome";
import { GameEvent } from "../model/GameEvent";
import { GameStatus } from "../model/GameStatus";
import { Question } from "../model/Question";


export class SmallTalkTense extends GameEvent {

    private static instance: SmallTalkTense;

    isRepetable: Boolean = true;

    private constructor() {
        super();
    }

    matchCondition(gameStatus: GameStatus): Boolean {
        return (gameStatus.cringe >= 3 && gameStatus.cringe < 5)
            || (gameStatus.anxiety >= 3 && gameStatus.anxiety < 5);
    }

    question: Question = new Question(
        new Array(
            "So, what your plan now, are you going to say something or what?",
            "In the meanwhile you could say somenthing.....",
            "Maybe you can say something...",
            "You're not making this situation any better by staying silent. Speak up now."
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
                "I'll try to start a conversation and see where it goes.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, -1
                    ),
                ),
            ),
            new Choice(
                "I'll break the silence with a joke to lighten the mood.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, +1
                    ),
                ),
            ),
            new Choice( 
                "Maybe I could bring up a common interest to find common ground.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, -1        
                    ),
                ),
            ),
            new Choice(                
                "I'll try to keep the conversation light and avoid any serious topics.",
                    new EventOutcome(
                        new GameStatusVariation(
                        0, 0, 0, 0
                ),
            ),
        )
    )

    static getInstance() {
        if (!SmallTalkTense.instance) {
            SmallTalkTense.instance = new SmallTalkTense();
        }
        return SmallTalkTense.instance;
    }

}
