import { ExitTheElevator } from "../event/ExitTheElevator";
import { SmallTalkNervous } from "../event/SmallTalkNervous";
import { SmallTalkQuiet } from "../event/SmallTalkQuiet";
import { StuckInTheElevator } from "../event/StuckInTheElevator";
import { GameEvent } from "../model/GameEvent";
import { GameStatus } from "../model/GameStatus";

export class EventPool {

    private MAX_NUMBER_OF_RETRY_TO_GET_AN_EVENT_BEFORE_THROW: number = 10;

    private events: Array<GameEvent> 

    private stuckInTheElevator: StuckInTheElevator;
    private exitTheElevator: ExitTheElevator;
    
    constructor(){
        this.stuckInTheElevator = StuckInTheElevator.getInstance();
        this.exitTheElevator = ExitTheElevator.getInstance();

        this.events = new Array<GameEvent>;
        this.events.push(SmallTalkNervous.getInstance());
        this.events.push(SmallTalkQuiet.getInstance());
    }


    public getRandomEventBaseOnGameStatus(
        currentGameStaus: GameStatus,
    ){
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