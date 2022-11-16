import * as Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {


  constructor() {
    super();
    this.pixelscale = 14
    this.scalesprite = 0.8035714
    this.framerate = 8
  }

  preload() {
    this.load.image('background', './assets/Lift - tiny.png');

    this.load.spritesheet('Mr.Bafo', 'assets/Mr.Bafo.png', {
      frameWidth: 448,
      frameHeight: 448,
    });
    this.load.spritesheet('Mrs.Oak', 'assets/Mrs.Oak.png', {
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
      .setScale(this.scalesprite);
    
    const mrBafoFrames = [...Array(this.framerate * 5).fill(0)].concat([2])
    this.anims.create({
      key: 'mrBafoIdle',
      frames: this.anims.generateFrameNames('Mr.Bafo', { frames: mrBafoFrames }),
      frameRate: this.framerate,
      repeat:-1,
    });

    const mrsOakFrames = [...Array(this.framerate * 4).fill(0)].concat([1])
    this.anims.create({
      key: 'mrsOakidle',
      frames: this.anims.generateFrameNumbers('Mrs.Oak', {frames: mrsOakFrames}),
      frameRate: this.framerate,
      repeat:-1,
    });

    const mrBafo = 
      this.add.sprite(
        game.config.width - (30 * this.pixelscale * this.scalesprite),
        game.config.height - (36 * this.pixelscale * this.scalesprite),
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    mrBafo.play('mrBafoIdle');

    const mrsOak = 
      this.add.sprite(
        game.config.width - (47 * this.pixelscale * this.scalesprite),
        game.config.height - (36 * this.pixelscale * this.scalesprite),
      )
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    mrsOak.play('mrsOakidle');
  }

}