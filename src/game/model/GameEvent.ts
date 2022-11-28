import { Choice } from "./Choice";
import { ChoiceOutcomeStatus } from "./ChoiceOutcomeStatus";
import { GameStatus } from "./GameStatus";
import { Question } from "./Question";

export abstract class GameEvent {

    question: Question;

    isRepetable: Boolean;

    matchCondition(gameStatus: GameStatus): Boolean {
        throw new Error("Method not implemented.");
    }

    computeNewGameStatus(
        choice: Choice,
        previousGameStaus: GameStatus,
    ): GameStatus{
        let newGameStatus = previousGameStaus;
        if(choice.changes.choiceOutcomeStatus != null){
            newGameStatus.anxiety += choice.changes.choiceOutcomeStatus.anxietyVariation;
            newGameStatus.floor += choice.changes.choiceOutcomeStatus.floorVariation;
            newGameStatus.airLevel += choice.changes.choiceOutcomeStatus.airLevelVariation;
        }
        if(choice.changes.gameObject != null){
            newGameStatus.inventory.add(choice.changes.gameObject)
        }
        newGameStatus.occuredEvents.push(this);
        newGameStatus.logCurrentStatus();
        return newGameStatus;
    }
}