import { GameObject } from "./GameObject";

export class GameStatus {
    anxiety: number = 0; // [0,1]
    floor: number = 22; // [0,22]
    airLevel: number = 1; // [0,1]
    inventory: GameObject[]; // Array of GameObject
}