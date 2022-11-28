import { GameObject } from "./GameObject";

export class ChoiceOutcomeStatus {
    public constructor(
        public anxietyVariation: number = 0,
        public floorVariation: number = 0,
        public airLevelVariation: number = 0,
    ){}
}