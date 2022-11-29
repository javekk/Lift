
import { GameEvent } from "../../model/GameEvent";

export class Exit extends GameEvent {

    public static isExit(any : any): boolean {
        return any instanceof Exit;
    }
}
