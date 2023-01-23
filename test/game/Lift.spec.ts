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
        expect(lift.pixelscale).toBe(14);
    });

    it('should have scalesprite attribute set to 0.8035714', () => {
        expect(lift.scalesprite).toBe(0.8035714);
    });

});