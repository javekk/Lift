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
            "So, what's your plan now, are you going to say something or not?",
            "In the meantime, you could say something...",
            "Perhaps you could say something...",
            "What's next on your agenda, are you going to speak to her?",
            "It would be great if you could share your thoughts.",
            "Are you planning on making any announcements?",
            "It's your turn to say something, don't you think?",
            "Don't be shy, she'd love to hear from you.",
        ),
        new Array(
            new Choice(
                "I am going to talk about the weather!",
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
                "Too nervous for speaking with girl!",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, 0, -1, +1
                    ),
                ),
            ),
            new Choice(
                "Maybe I can talk about my clinbing classes..",
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
            new Choice(
                "I'll ask her about her day",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, -1
                    ),
                ),
            ),
            new Choice(
                "I'll compliment her outfit",
                new EventOutcome(
                    new GameStatusVariation(
                        +1, 0, 0, +1
                    ),
                ),
            ),
            new Choice(
                "I'll talk about my latest adventure in the canteen..",
                new EventOutcome(
                    new GameStatusVariation(
                        0, 0, -1, +1
                    ),
                ),
            ),
            new Choice(
                "I'll keep quiet and listen to her",
                new EventOutcome(
                    new GameStatusVariation(
                        -2, 0, -1, -2
                    ),
                ),
            ),
            new Choice(
                "I can try to impress her with a joke.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, +2
                    ),
                ),
            ),
            new Choice(
                "I think I'll talk about my hobbies and interests.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, +2
                    ),
                ),
            ),
            new Choice(
                "I'll tell her about a recent trip I took.",
                new EventOutcome(
                    new GameStatusVariation(
                        -1, 0, 0, 0
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
