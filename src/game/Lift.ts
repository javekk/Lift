import * as Phaser from 'phaser';
import { Choice } from './model/Choice';
import { Point } from './model/ui/Point';
import { GameEvent } from './model/GameEvent';
import { StuckInTheElevator } from './event/StuckInTheElevator'
import { GameStatus } from './model/GameStatus';
import { Exit } from './event/app/Exit';
import { Restart } from './event/app/Restart';
import { EventPool } from './service/EventPool';
import { SpriteManager } from './model/ui/SpriteManager';
import { UIManager } from './model/ui/UIManager';


const DESTROY_QUESTION_SPRITE_EVENT = 'destroySprite';


export default class Lift extends Phaser.Scene {

  textSizeBig: number
  textSizeSmall: number

  currentStatus: GameStatus
  currentEvent: GameEvent
  eventPool: EventPool

  uiManager: UIManager
  spriteManager: SpriteManager

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.textSizeBig = 24;
    this.textSizeSmall = 20;
    this.currentStatus = new GameStatus();
    this.currentEvent = StuckInTheElevator.getInstance();
    this.eventPool = new EventPool();
    this.uiManager = new UIManager();
    this.spriteManager = new SpriteManager(this, this.uiManager);
  }

  preload() {
    this.spriteManager.loadSprites();
  }

  create() {
    this.spriteManager.addGameSprites();
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


  private addQuestionAndChoices() {

    const questionCoordinates = new Point(
      (+this.game.config.width / 2) + this.asPixel(2),
      this.asPixel(1)
    );
    this.currentEvent.question.sprite = this.spriteManager.addSprite(questionCoordinates, 'bigFrame');
    this.currentEvent.question.textSprite = this.addText(
      new Point(
        questionCoordinates.x + this.asPixel(2),
        questionCoordinates.y + this.asPixel(2),
      ),
      this.currentEvent.question.getRandomQuestionText(),
    );
    this.displayChoices(this.currentEvent.question.getRandomFourChoices());

    this.events.on(
      DESTROY_QUESTION_SPRITE_EVENT, 
        function () {
          this.currentEvent.question.destroySprite(); 
      }, 
      this,
    );
  }

  private displayChoices(choices: Array<Choice>) {
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
      let choiceBox = this.spriteManager.addSprite(choiceCoordinates, 'smallFrame');
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

  private handleChoiceClick(choice: Choice) {
    return function () {
      this.currentStatus = this.currentEvent.computeNewGameStatus(choice, this.currentStatus);
      this.handleNewEvent(choice);
    };
  }

  private handleNewEvent(choice: Choice) {
    this.events.emit(DESTROY_QUESTION_SPRITE_EVENT); 
    const nextEvent = this.eventPool.getNextEvent(choice, this.currentStatus);
    if (Exit.isExit(nextEvent))
      this.exitGame();
    else if (Restart.isRestart(nextEvent))
      this.restartGame();
    else
      this.currentEvent = nextEvent;
    this.currentEvent.logCurrentEvent();
    this.addQuestionAndChoices();
  }

  private asPixel(numberOfPixel: number) {
    return this.uiManager.asPixel(numberOfPixel);
  }

  private addText(coordinates: Point, text: string, isQuestion: boolean = true) {
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

  private exitGame() {
    // TODO
    console.log("Exit Game Called");
  }

  private restartGame() {
    // TODO
    console.log("Restart Game Called");
  }
}