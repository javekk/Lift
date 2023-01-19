import Lift from "../../src/game/Lift";
import "jest-canvas-mock";

describe("Lift class ", () => {

    let lift: Lift;
    beforeEach(() => {
      lift = new Lift({});
    });

    
    it('should have pixelscale attribute set to 14', () => {
        expect(lift.pixelscale).toBe(14);
    });

    it('should have scalesprite attribute set to 0.8035714', () => {
        expect(lift.scalesprite).toBe(0.8035714);
    });


    describe('preload method should load the following images correctly', () => {
       test('the background image', () => {
            const spy = jest.spyOn(lift.load, 'image');
            lift.preload();
            expect(spy).toHaveBeenCalledWith('background', './assets/Lift - tiny.png');
            spy.mockRestore();
        });
    });

    test('preload should load the Mr. Bafo spritesheet', () => {
        const spy = jest.spyOn(lift.load, 'spritesheet');
        lift.preload();
        expect(spy).toHaveBeenCalledWith('Mr.Bafo', 'assets/Mr.Bafo.png', {
          frameWidth: 448,
          frameHeight: 448,
        });
        spy.mockRestore();
      });
});

