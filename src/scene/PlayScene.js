import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {

  constructor() {
    super();
  }

  preload() {
    this.load.image('background', './assets/background-lift.png');

    this.load.spritesheet('Mr.Bafo', 'assets/Mr.BafoIdle.png', {
      frameWidth: 448,
      frameHeight: 448,
    });
    this.load.spritesheet('Mrs.Oak', 'assets/Mrs.OakIdle.png', {
      frameWidth: 448,
      frameHeight: 448
    });

  }

  create() {
    const background = this.add.image(
        0,
        0,
        'background'
      )
      .setOrigin(0, 0)
      .setScale(0.57);

    this.anims.create({
      key: 'mrBafoIdle',
      frames: this.anims.generateFrameNames('Mr.Bafo'),
      frameRate: 4,
      repeat:-1,
    });

    this.anims.create({
      key: 'mrsOakidle',
      frames: this.anims.generateFrameNumbers('Mrs.Oak'),
      frameRate: 4,
      repeat:-1,
    });

    const mrBafo = 
      this.add.sprite(
        game.config.width - 350,
        game.config.height - 400,
      )
      .setScale(0.77)
      .setOrigin(0, 0);
    mrBafo.play('mrBafoIdle');

    const mrsOak = 
      this.add.sprite(
        game.config.width - 550,
        game.config.height - 400,
      )
      .setScale(0.77)
      .setOrigin(0, 0);
    mrsOak.play('mrsOakidle');

  }

}