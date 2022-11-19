import * as Phaser from 'phaser';
import PlayScene from './src/scene/PlayScene';

const config = {
  name: 'Lift',
  type: Phaser.AUTO,
  width: 540 * 2,
  height: 720,
  pixelArt: true,
  scene: [PlayScene],
};

window.game = new Phaser.Game(config);