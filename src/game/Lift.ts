import * as Phaser from 'phaser';
import { Question } from './model/Question';
import { Choice } from './model/Choice';
import { Point } from './model/ui/Point';
import { GameEvent } from './model/GameEvent';
import { StuckInTheElevator} from './event/StuckInTheElevator'
import { GameStatus } from './model/GameStatus';

export default class Lift extends Phaser.Scene{

  pixelscale: number
  scalesprite: number
  framerate: number
  textSizeBig: number
  textSizeSmall: number

  questionBox: any
  questionText: any

  gameOverText: any

  currentStatus: GameStatus
  currentEvent: GameEvent

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.pixelscale = 14;
    this.scalesprite = 0.8035714;
    this.framerate = 8;
    this.textSizeBig = 24;
    this.textSizeSmall = 20;
    this.currentEvent = StuckInTheElevator.getInstance();
    this.currentStatus = new GameStatus();
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

    this.load.image('smallFrame', 'assets/smallFrame.png');
    this.load.image('bigFrame', 'assets/bigFrame.png');
  }


  create() {

    this.add.image(
        0,
        0,
        'background'
      )
      .setOrigin(0, 0)
      .setScale(this.scalesprite);

    const mrBafoFrames = [...Array(this.framerate * 5).fill(0)].concat([2])
    console.log("aaa" + mrBafoFrames)
    this.anims.create({
      key: 'mrBafoIdle',
      frames: this.anims.generateFrameNames('Mr.Bafo', {
        frames: mrBafoFrames
      }),
      frameRate: this.framerate,
      repeat: -1,
    });

    const mrsOakFrames = [...Array(this.framerate * 4).fill(0)].concat([1])
    this.anims.create({
      key: 'mrsOakidle',
      frames: this.anims.generateFrameNumbers('Mrs.Oak', {
        frames: mrsOakFrames
      }),
      frameRate: this.framerate,
      repeat: -1,
    });

    const mrBafo = this.addSprite(
      new Point(
        this.pixelscale * this.scalesprite,
        +this.game.config.height - (this.asPixel(36) * this.scalesprite)
      )
    )
    mrBafo.play('mrBafoIdle');

    const mrsOak = this.addSprite(
      new Point(
        this.asPixel(17) * this.scalesprite,
        +this.game.config.height - (this.asPixel(36) * this.scalesprite),
      ),
    )
    mrsOak.play('mrsOakidle');

    // Question
    this.addQuestionAndChoices();

    this.input.on('gameobjectup', function (pointer: any, gameObject: Phaser.GameObjects.GameObject) {
      gameObject.emit('clicked', gameObject);
    }, this);
    // Game over text
    this.gameOverText = this.add.text(
        this.asPixel(2),
        +this.game.config.height / 2,
        '', 
        { font: '42px Arial' }
      )
      .setOrigin(0, 0);
  }

  addQuestionAndChoices() {
    const questionCoordinates = new Point(
      (+this.game.config.width / 2) + this.asPixel(2),
      this.asPixel(1)
    );
    this.questionBox = this.addSprite(questionCoordinates, 'bigFrame');
    this.questionText = this.addText(
      new Point(
        questionCoordinates.x + this.asPixel(2),
        questionCoordinates.y + this.asPixel(2),
      ),
      this.currentEvent.question.text
    );
    // Choices
    this.displayChoice(this.currentEvent.question.choices);
  }

  displayChoice(choices: Set<Choice>) {
    let verticalOffset = this.asPixel(12);
    let isEven = true;
    choices.forEach((choice: Choice) => {

      let choiceCoordinates;
      if (isEven) {
        choiceCoordinates = new Point(
          (+this.game.config.width / 2) + this.asPixel(2),
          verticalOffset + this.asPixel(1)
        );
        isEven = !isEven;
      } else {
        choiceCoordinates = new Point(
          (+this.game.config.width / 2) + this.asPixel(20),
          verticalOffset + this.asPixel(1)
        );
        verticalOffset += this.asPixel(8);
        isEven = !isEven;
      }
      let choiceBox = this.addSprite(choiceCoordinates, 'smallFrame');
      choiceBox.setInteractive();
      choiceBox.on('clicked', this.handleChoiceClick(choice), this);
      this.addText(
        new Point(
          choiceCoordinates.x + this.asPixel(2),
          choiceCoordinates.y + this.asPixel(1)
        ),
        choice.text,
        false,
      );
    });
  }

  handleChoiceClick(choice: Choice) {
    return function () {
        this.gameOverText.setText(choice.text);
        this.currentStatus = this.currentEvent.computeNewGameStatus(choice, this.currentStatus);
        // TODO get new Event from EventPool
      };
  }

  asPixel(numberOfPixel: number) {
    return numberOfPixel * this.pixelscale;
  }


  addSprite(coordinates: Point, spriteName?: string): Phaser.GameObjects.Sprite {
    let sprite: Phaser.GameObjects.Sprite;
    if(spriteName != null){
      sprite = this.add.sprite(
        coordinates.x,
        coordinates.y,
        spriteName
      )
    } else {
      sprite = this.add.sprite(
        coordinates.x,
        coordinates.y,
        'smallFrame' // todo use correct frame
      ) 
    }
    sprite
    .setScale(this.scalesprite)
    .setOrigin(0, 0);
    return sprite;
  }

  addText(coordinates: Point, text: string, isQuestion: boolean = true) {
    let maxPixelPerRow = isQuestion ? 30: 14;
    let correctTextSize = isQuestion ? this.textSizeBig : this.textSizeSmall;

    return this.add.text(
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
  }

}