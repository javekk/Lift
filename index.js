import * as Phaser from 'phaser';
import PlayScene from './src/scene/PlayScene';

const config = {
  name: 'Lift',
  type: Phaser.AUTO,
  width: 592,
  height: 768,
  pixelArt: true,
  scene: [PlayScene],
};

window.game = new Phaser.Game(config);