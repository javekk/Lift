import { GameEvent } from './GameEvent';
import { GameObject } from './GameObject';

export class GameStatus {
    public constructor(
        public anxiety: number = 0,
        public cringe: number = 1,
        public floor: number = 22,
        public airLevel: number = 5,
        public inventory: Set<GameObject> = new Set(),
        public pastEvents: Array<GameEvent> = new Array(),
    ) { }


    logCurrentStatus() {
        const invetoryTxt: string = (this.inventory.size > 0) ?
            '[\n\t' + Array.from(this.inventory).map(obj => obj.name + '\n').join(',\n\t')  + '\t\t\n]' :
            '[]';

        const eventsTxt: string = (this.pastEvents.length > 0) ?
            '[\n\t' + Array.from(this.pastEvents).map(obj => obj.constructor.name).join(',\n\t') + '\t\t\n]' :
            '[]'

        const statusTxt: string = [
        'Status:', 
        `   Anxiety: ${this.anxiety}`,
        `   Floor: ${this.floor}`,
        `   AirLevel: ${this.airLevel}`,
        `   Cringe: ${this.cringe}`,
        `   Inventory: ${invetoryTxt}`,
        `   Past Events: ${eventsTxt}`,
        ].join('\n');
        console.log(statusTxt);
    }
}