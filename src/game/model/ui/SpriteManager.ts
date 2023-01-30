import { Point } from "./Point";
import { UIManager } from "./UIManager";

export class SpriteManager {

  private scalesprite: number
  private framerate: number
  private sprites: Map<string, Phaser.GameObjects.Sprite>

  constructor(
    private scene: Phaser.Scene,
    private uiManager: UIManager,
  ) {
    this.scalesprite = 0.8035714;
    this.framerate = 8;
    this.sprites = new Map();
  }

  public loadSprites() {
    const charactersFrameSize = {
      frameWidth: 448,
      frameHeight: 448,
    };

    this.scene.load.image('background', './assets/Lift - tiny.png');

    this.scene.load.spritesheet('Mr.Bafo', 'assets/Mr.Bafo.png', charactersFrameSize);
    this.scene.load.spritesheet('Mrs.Oak', 'assets/Mrs.Oak.png', charactersFrameSize);

    this.scene.load.image('smallFrame', 'assets/smallFrame.png');
    this.scene.load.image('bigFrame', 'assets/bigFrame.png');
  }

  public addGameSprites() {
    this.createBackground();
    this.createMrBafo();
    this.createMrsOak();
  }

  public getSprite(spriteName: string): Phaser.GameObjects.Sprite {
    return this.sprites.get(spriteName);
  }

  private createBackground() {
    this.scene.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(this.scalesprite);
  }

  private createMrBafo() {
    const mrBafoFrames = [...Array(this.framerate * 5).fill(0)].concat([2]);
    this.scene.anims.create({
      key: 'mrBafoIdle',
      frames: this.scene.anims.generateFrameNames('Mr.Bafo', {
        frames: mrBafoFrames
      }),
      frameRate: this.framerate,
      repeat: -1,
    });
    const mrBafo = this.addSprite(
      new Point(
        this.uiManager.pixelscale * this.scalesprite,
        +this.scene.game.config.height - (this.asPixel(36) * this.scalesprite)
      )
    )
    mrBafo.play('mrBafoIdle');
  }

  private createMrsOak() {
    const mrsOakFrames = [...Array(this.framerate * 4).fill(0)].concat([1]);
    this.scene.anims.create({
      key: 'mrsOakidle',
      frames: this.scene.anims.generateFrameNumbers('Mrs.Oak', {
        frames: mrsOakFrames
      }),
      frameRate: this.framerate,
      repeat: -1,
    });
    const mrsOak = this.addSprite(
      new Point(
        this.asPixel(17) * this.scalesprite,
        +this.scene.game.config.height - (this.asPixel(36) * this.scalesprite),
      ),
    )
    mrsOak.play('mrsOakidle');
  }

  public addSprite(coordinates: Point, spriteName?: string): Phaser.GameObjects.Sprite {
    let sprite: Phaser.GameObjects.Sprite;
    if (spriteName != null) {
      sprite = this.scene.add.sprite(
        coordinates.x,
        coordinates.y,
        spriteName,
      )
    } else {
      sprite = this.scene.add.sprite(
        coordinates.x,
        coordinates.y,
        'smallFrame', // TODO use correct frame
      )
    }
    sprite
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    return sprite;
  }

  private asPixel(numberOfPixel: number) {
    return this.uiManager.asPixel(numberOfPixel);
  }

}
