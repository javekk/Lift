import { Point } from "./Point";

export class UIManager {

    constructor(
        public pixelscale: number = 14,
    ) { }

    public asPixel(numberOfPixel: number) {
        return numberOfPixel * this.pixelscale;
    }
}
