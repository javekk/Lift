import { GameEvent } from "./GameEvent";
import { GameObject } from "./GameObject";

export class GameStatus {
    public constructor(
        public anxiety: number = 0,
        public floor: number = 22,
        public airLevel: number = 1,
        public inventory: Set<GameObject> = new Set(),
        public occuredEvents: Array<GameEvent> = new Array(),
    ) { }


    logCurrentStatus() {
        console.log("Status: \n");
        console.log("\tAnxiety: " + this.anxiety);
        console.log("\tFloor: " + this.floor);
        console.log("\tAirLevel: " + this.airLevel);

        console.log("\tInventory: [");
        Array.from(this.inventory).map(obj => {
            console.log("\t\t" + obj.name + "\n")
        });
        console.log("\t]");

        console.log("\tPast Events: [");
        Array.from(this.occuredEvents).map(obj => {
            console.log("\t\t" + obj.constructor.name + "\n")
        });
        console.log("\t]");
    }
}