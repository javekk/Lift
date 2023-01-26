import Lift from "../../src/game/Lift";
import "jest-canvas-mock";

describe("Lift class ", () => {

    let lift: Lift;
    beforeEach(() => {
      lift = new Lift({});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should have pixelscale attribute set to 14', () => {
        expect(lift.uiManager.pixelscale).toBe(14);
    });

});