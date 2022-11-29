
import { GameEvent } from "../../model/GameEvent";

export class Restart extends GameEvent {

    public static isRestart(any : any): boolean {
        return any instanceof Restart;
    }
}
