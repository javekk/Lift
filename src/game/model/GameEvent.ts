import { Choice } from "./Choice";
import { GameStatusVariation } from "./ChoiceOutcomeStatus";
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
        if(choice.changes.gameStatusVariation != null){
            newGameStatus.anxiety += choice.changes.gameStatusVariation.anxietyVariation;
            newGameStatus.floor += choice.changes.gameStatusVariation.floorVariation;
            newGameStatus.airLevel += choice.changes.gameStatusVariation.airLevelVariation;
        }
        if(choice.changes.newGameObject != null){
            newGameStatus.inventory.add(choice.changes.newGameObject)
        }
        newGameStatus.occuredEvents.push(this);
        newGameStatus.logCurrentStatus();
        return newGameStatus;
    }
}