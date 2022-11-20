import * as Phaser from 'phaser';
import Lift from './src/game/Lift';



export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 540 * 2,
    height: 720,
    pixelArt: true,
    scene: [Lift],
});