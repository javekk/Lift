import * as Phaser from 'phaser';
import { Choice } from './model/Choice';
import { Point } from './model/ui/Point';
import { GameEvent } from './model/GameEvent';
import { StuckInTheElevator } from './event/StuckInTheElevator'
import { GameStatus } from './model/GameStatus';
import { Exit } from './event/app/Exit';
import { Restart } from './event/app/Restart';


const DESTROY_QUESTION_SPRITE_EVENT = 'destroySprite';


export default class Lift extends Phaser.Scene {

  pixelscale: number
  scalesprite: number
  framerate: number
  textSizeBig: number
  textSizeSmall: number

  currentStatus: GameStatus
  currentEvent: GameEvent

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.pixelscale = 14;
    this.scalesprite = 0.8035714;
    this.framerate = 8;
    this.textSizeBig = 24;
    this.textSizeSmall = 20;
    this.currentStatus = new GameStatus();
    this.currentEvent = StuckInTheElevator.getInstance();
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

    this.input.on(
      'gameobjectup', 
      function (pointer: any, gameObject: Phaser.GameObjects.GameObject) {
          gameObject.emit('clicked', gameObject);
      }, 
      this,
    );

    this.currentStatus.logCurrentStatus();
    this.currentEvent.logCurrentEvent();
  }

  addQuestionAndChoices() {

    const questionCoordinates = new Point(
      (+this.game.config.width / 2) + this.asPixel(2),
      this.asPixel(1)
    );
    this.currentEvent.question.sprite = this.addSprite(questionCoordinates, 'bigFrame');
    this.currentEvent.question.textSprite = this.addText(
      new Point(
        questionCoordinates.x + this.asPixel(2),
        questionCoordinates.y + this.asPixel(2),
      ),
      this.currentEvent.question.getRandomQuestionText(),
    );
    // Choices
    this.displayChoice(this.currentEvent.question.getRandomFourChoices());

    // Destroy event
    this.events.on(
      DESTROY_QUESTION_SPRITE_EVENT, 
        function () {
          this.currentEvent.question.destroySprite(); 
      }, 
      this,
    );
  }

  displayChoice(choices: Array<Choice>) {
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
    });
  }

  handleChoiceClick(choice: Choice) {
    return function () {
      this.currentStatus = this.currentEvent.computeNewGameStatus(choice, this.currentStatus);
      this.handleNewEvent(choice);
    };
  }

  handleNewEvent(choice: Choice) {
    this.events.emit(DESTROY_QUESTION_SPRITE_EVENT); 
    if (choice.changes.nextEvent != null) {
      if (Exit.isExit(choice.changes.nextEvent))
        this.exitGame();
      else if (Restart.isRestart(choice.changes.nextEvent))
        this.restartGame();
      else
        this.currentEvent = choice.changes.nextEvent;
    }
    else {
      // TODO get new Event from EventPool
    }
    this.currentEvent.logCurrentEvent();
    this.addQuestionAndChoices();
  }

  asPixel(numberOfPixel: number) {
    return numberOfPixel * this.pixelscale;
  }

  addSprite(coordinates: Point, spriteName?: string): Phaser.GameObjects.Sprite {
    let sprite: Phaser.GameObjects.Sprite;
    if (spriteName != null) {
      sprite = this.add.sprite(
        coordinates.x,
        coordinates.y,
        spriteName
      )
    } else {
      sprite = this.add.sprite(
        coordinates.x,
        coordinates.y,
        'smallFrame' // TODO use correct frame
      )
    }
    sprite
      .setScale(this.scalesprite)
      .setOrigin(0, 0);
    return sprite;
  }

  addText(coordinates: Point, text: string, isQuestion: boolean = true) {
    let maxPixelPerRow = isQuestion ? 30 : 14;
    let correctTextSize = isQuestion ? this.textSizeBig : this.textSizeSmall;

    let textObj: Phaser.GameObjects.Text;
    textObj = this.add.text(
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

  exitGame() {
    // TODO
    console.log("Exit Game Called");
  }

  restartGame() {
    // TODO
    console.log("Restart Game Called");
  }
}