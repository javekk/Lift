import "jest-canvas-mock";
import { EventPool } from "../../../src/game/service/EventPool";

describe("Lift class ", () => {

    let eventPool: EventPool;
    beforeEach(() => {
      eventPool = new EventPool();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('events activates condition should cover all possible game status', () => {
    });

});