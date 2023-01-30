import { ExitTheElevator } from "../event/ExitTheElevator";
import { SmallTalkNervous } from "../event/SmallTalkNervous";
import { SmallTalkQuiet } from "../event/SmallTalkQuiet";
import { StuckInTheElevator } from "../event/StuckInTheElevator";
import { Choice } from "../model/Choice";
import { GameEvent } from "../model/GameEvent";
import { GameStatus } from "../model/GameStatus";

export class EventPool {

    private events: Array<GameEvent> 

    private stuckInTheElevator: StuckInTheElevator;
    private exitTheElevator: ExitTheElevator;
    
    constructor(){
        this.stuckInTheElevator = StuckInTheElevator.getInstance();
        this.exitTheElevator = ExitTheElevator.getInstance();

        this.events = new Array(
            SmallTalkNervous.getInstance(),
            SmallTalkQuiet.getInstance()
        );
    }

    public getNextEvent(
        choice: Choice,
        currentGameStaus: GameStatus,
    ): GameEvent{
        if (choice.changes.nextEvent != null) {
            return choice.changes.nextEvent;
        }
        else {
            return this.getRandomEventBaseOnGameStatus(currentGameStaus);
        }
    }

    private getRandomEventBaseOnGameStatus(
        currentGameStaus: GameStatus,
    ): GameEvent {
        let oldValues = new Set<number>([]);
        while(oldValues.size < this.events.length){
            var randomNumber = Math.floor(Math.random() * this.events.length);
            while(oldValues.has(randomNumber)){
                randomNumber = Math.floor(Math.random() * this.events.length);
            }
            oldValues.add(randomNumber);
            if(this.events[randomNumber].matchCondition(currentGameStaus))
                return this.events[randomNumber];
        }
        throw Error("No events matches the condition, poor game developing skills I guess....");
    }
}