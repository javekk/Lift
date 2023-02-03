import { Choice } from "../Choice";
import { GameEvent } from "../GameEvent";
import { Point } from "./Point";
import { UIManager } from "./UIManager";

export class SpriteManager {

  private textSizeBig: number
  private textSizeSmall: number

  private scalesprite: number
  private framerate: number
  private sprites: Map<string, Phaser.GameObjects.Sprite>
  
  private choicePositions: Array<Point>

  constructor(
    private scene: Phaser.Scene,
    private uiManager: UIManager,
  ) {
    this.scalesprite = 0.8035714;
    this.framerate = 8;
    this.textSizeBig = 24;
    this.textSizeSmall = 20;
    this.sprites = new Map();
  }

  // After constructor initialization
  // TODO merge this method within the constructor
  public init(){
    this.choicePositions = new Array(
      new Point(
        (+this.scene.game.config.width / 2) + this.asPixel(2),
        this.asPixel(12) + this.asPixel(1)
      ),
      new Point(
        (+this.scene.game.config.width / 2) + this.asPixel(20),
        this.asPixel(12) + this.asPixel(1)
      ),
      new Point(
        (+this.scene.game.config.width / 2) + this.asPixel(2),
        this.asPixel(20) + this.asPixel(1)
      ),
      new Point(
        (+this.scene.game.config.width / 2) + this.asPixel(20),
        this.asPixel(20) + this.asPixel(1)
      ),
    );
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

    this.scene.load.image('inventory', 'assets/Inventory.png');    
    this.scene.load.image('separator', 'assets/Separator.png');

  }


  public addGameSprites() {
    this.createBackground();
    this.createMrBafo();
    this.createMrsOak();
    this.createInventory();
    this.createSeparator();
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
    this.sprites.set('Mr.Bafo', mrBafo);
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
    this.sprites.set('Mrs.Oak', mrsOak);
    mrsOak.play('mrsOakidle');
  }


  public getSprite(spriteName: string): Phaser.GameObjects.Sprite {
    return this.sprites.get(spriteName);
  }  

  public addQuestion(currentEvent: GameEvent){
    const questionCoordinates = new Point(
      (+this.scene.game.config.width / 2) + this.asPixel(2),
      this.asPixel(1)
    );
    currentEvent.question.sprite = this.addSprite(questionCoordinates, 'bigFrame');
    currentEvent.question.textSprite = this.addText(
      new Point(
        questionCoordinates.x + this.asPixel(2),
        questionCoordinates.y + this.asPixel(2),
      ),
      currentEvent.question.getRandomQuestionText(),
    );
  }

  public addChoice(choice: Choice, choicePosition: number): Phaser.GameObjects.Sprite{
      const choiceCoordinates = this.choicePositions[choicePosition];
      const choiceBox = this.addSprite(choiceCoordinates, 'smallFrame');
      choice.sprite = choiceBox;
      let textSprite = this.addText(
        new Point(
          choiceCoordinates.x + this.asPixel(2),
          choiceCoordinates.y + this.asPixel(1)
        ),
        choice.text,
        false,
      );
      choice.textSprite = textSprite;
      return choiceBox;
  }

  private addText(coordinates: Point, text: string, isQuestion: boolean = true) {
    let maxPixelPerRow = isQuestion ? 30 : 14;
    let correctTextSize = isQuestion ? this.textSizeBig : this.textSizeSmall;

    let textObj: Phaser.GameObjects.Text;
    textObj = this.scene.add.text(
      coordinates.x,
      coordinates.y,
      text,
      {
        font: correctTextSize + 'px Arial',
        color: '#292c33',
        wordWrap: { width: this.asPixel(maxPixelPerRow) }
      }
    )
      .setOrigin(0, 0);
    return textObj;
  }

  private createSeparator() {
    const separatorCoordinates = new Point(
      (+this.scene.game.config.width / 2) + this.asPixel(2),
      +this.scene.game.config.height - this.asPixel(24) ,
    );
    const separator = this.addSprite(separatorCoordinates, 'separator');
    this.sprites.set('separator', separator);
  }

  private createInventory() {
    const inventoryCoordinates = new Point(
      (+this.scene.game.config.width / 2) + this.asPixel(2),
      +this.scene.game.config.height - this.asPixel(4 + 10) ,
    );
    const inventory = this.addSprite(inventoryCoordinates, 'inventory');
    this.sprites.set('inventory', inventory);
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


  private asPixel(numberOfPixel: number): number {
    return this.uiManager.asPixel(numberOfPixel);
  }

}
